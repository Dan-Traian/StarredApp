import * as React from "react";
import * as ReactDOM from "react-dom";
import { CaretDown } from "@phosphor-icons/react";

export interface SelectInputProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  invalid?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

type OptionItem = { value: string; label: React.ReactNode; disabled?: boolean };

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function getNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement(node)) {
    const props: any = node.props;
    return getNodeText(props?.children);
  }
  return "";
}

function extractOptions(children: React.ReactNode): OptionItem[] {
  const options: OptionItem[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const isOption = typeof child.type === "string" && child.type.toLowerCase() === "option";
    if (!isOption) return;
    const props: any = child.props;
    const labelText = getNodeText(props.children);
    const explicitValue = props.value;
    const computedValue = explicitValue !== undefined && explicitValue !== null ? String(explicitValue) : labelText;
    const { disabled } = props as { disabled?: boolean };
    options.push({ value: computedValue, label: props.children, disabled });
  });
  return options;
}

export const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  (
    {
      className,
      invalid,
      children,
      name,
      defaultValue,
      value,
      onChange,
      placeholder,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const options = React.useMemo(() => extractOptions(children), [children]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) ?? (defaultValue as string) ?? (options[0]?.value ?? "")
    );

    const selected = React.useMemo(
      () => options.find((o) => o.value === ((value as string) ?? internalValue)),
      [options, value, internalValue]
    );
    const placeholderFromOptions = React.useMemo(() => {
      const firstDisabled = options.find((o) => o.disabled);
      return firstDisabled ? getNodeText(firstDisabled.label) : undefined;
    }, [options]);

    function handleSelect(val: string) {
      if (disabled) return;
      setIsOpen(false);
      if (value === undefined) {
        setInternalValue(val);
      }
      onChange?.(val);
    }

    React.useEffect(() => {
      function onDocClick(e: MouseEvent) {
        if (!(e.target instanceof Node)) return;
        const el = containerRef.current;
        if (el && !el.contains(e.target)) setIsOpen(false);
      }
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});

    const updateMenuPosition = React.useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = rect.top + rect.height;
      const left = rect.left;
      const minWidth = rect.width;
      const maxHeight = Math.max(160, window.innerHeight - top - 8);
      setMenuStyle({
        position: "fixed",
        top,
        left,
        minWidth,
        maxHeight,
      });
    }, []);

    function openWithPositioning() {
      // Compute immediately so first paint uses correct fixed coordinates
      updateMenuPosition();
      // Schedule another pass next frame in case layout shifts
      requestAnimationFrame(() => updateMenuPosition());
    }

    React.useLayoutEffect(() => {
      if (!isOpen) return;
      updateMenuPosition();
      const onScroll = () => updateMenuPosition();
      const onResize = () => updateMenuPosition();
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onResize);
      };
    }, [isOpen, updateMenuPosition]);

    return (
      <div ref={(node) => { containerRef.current = node; if (typeof ref === "function") ref(node); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }} className={cn("relative", className)}>
        {name ? (
          <input type="hidden" name={name} value={(value as string) ?? internalValue} />
        ) : null}
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen((prev) => {
              const next = !prev;
              if (next) openWithPositioning();
              return next;
            })
          }
          ref={triggerRef}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-xl border bg-white px-3 text-left text-sm text-gray-800 transition focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            invalid ? "border-red-400 focus-visible:ring-red-400" : "border-gray-300 focus-visible:ring-gray-300"
          )}
          {...props}
        >
          <span className={cn(!selected?.value ? "text-gray-400" : undefined)}>
            {selected?.label ?? (placeholder ?? placeholderFromOptions ?? "Select")}
          </span>
          <CaretDown size={16} className="ml-2 text-gray-500" />
        </button>

        {isOpen
          ? ReactDOM.createPortal(
              <div
                role="listbox"
                aria-labelledby={id}
                style={menuStyle}
                className="z-50 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-md"
              >
                {options.map((opt, idx) => (
                  <button
                    key={`${opt.value}::${idx}`}
                    role="option"
                    aria-selected={((value as string) ?? internalValue) === opt.value}
                    disabled={opt.disabled}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm",
                      ((value as string) ?? internalValue) === opt.value
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-800 hover:bg-gray-50",
                      opt.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>,
              document.body
            )
          : null}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;


