"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type FlyoutPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface FlyoutProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: (args: { ref: React.Ref<HTMLButtonElement>; props: React.ButtonHTMLAttributes<HTMLButtonElement> }) => React.ReactNode;
  anchorRef?: React.RefObject<HTMLElement>;
  children: React.ReactNode; // content
  className?: string; // applied to panel
  placement?: FlyoutPlacement;
  matchTriggerWidth?: boolean;
  hoverOpen?: boolean;
}

function computePosition(trigger: HTMLElement, placement: FlyoutPlacement, matchWidth: boolean, panel?: HTMLElement | null): React.CSSProperties {
  const rect = trigger.getBoundingClientRect();
  const left = placement.endsWith("-end") ? rect.right : rect.left;
  const style: React.CSSProperties = {
    position: "fixed",
    left: placement.endsWith("-end") ? left : left,
    transform: placement.endsWith("-end") ? "translateX(-100%)" : undefined,
    minWidth: matchWidth ? rect.width : undefined,
    zIndex: 50,
  };

  if (placement.startsWith("bottom")) {
    style.top = rect.top + rect.height + 4; // 4px gap below trigger
    style.maxHeight = Math.max(160, window.innerHeight - style.top - 8);
  } else {
    // For top placement, position above the trigger
    if (panel) {
      // Use actual panel height if available
      const panelHeight = panel.getBoundingClientRect().height;
      style.top = rect.top - panelHeight - 8; // 8px gap above trigger
    } else {
      // Initial render - use estimate, will be corrected on next frame
      const estimatedHeight = 120; // conservative estimate
      style.top = rect.top - estimatedHeight - 8;
    }
    style.maxHeight = Math.max(160, rect.top - 8);
  }

  return style;
}

export function Flyout({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  trigger,
  anchorRef,
  children,
  className,
  placement = "bottom-start",
  matchTriggerWidth = true,
  hoverOpen = false,
}: FlyoutProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(!!defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? (controlledOpen as boolean) : uncontrolledOpen;
  const setOpen = (v: boolean) => {
    if (!isControlled) setUncontrolledOpen(v);
    onOpenChange?.(v);
  };

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [panelStyle, setPanelStyle] = React.useState<React.CSSProperties>({});

  const update = React.useCallback(() => {
    const el = (anchorRef?.current as HTMLElement | null) ?? triggerRef.current;
    if (!el) return;
    setPanelStyle(computePosition(el, placement, matchTriggerWidth, panelRef.current));
  }, [placement, matchTriggerWidth, anchorRef]);

  function openWithPositioning() {
    setOpen(true);
    // Position after opening to ensure content is rendered
    requestAnimationFrame(() => {
      update();
      // Second frame to ensure all content is measured
      requestAnimationFrame(update);
    });
  }

  React.useLayoutEffect(() => {
    if (!open) return;
    // Initial positioning
    update();
    // Ensure positioning after content is rendered
    const timeoutId = setTimeout(update, 0);
    const onScroll = () => update();
    const onResize = () => update();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, update]);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!(e.target instanceof Node)) return;
      const t = (anchorRef?.current as HTMLElement | null) ?? triggerRef.current;
      if (t && !t.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [anchorRef]);

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> = hoverOpen
    ? {
        onMouseEnter: () => openWithPositioning(),
        onMouseLeave: () => setOpen(false),
        onFocus: () => openWithPositioning(),
        onBlur: () => setOpen(false),
      }
    : {
        onClick: () => (open ? setOpen(false) : openWithPositioning()),
      };

  return (
    <>
      {trigger ? trigger({ ref: triggerRef as React.Ref<HTMLButtonElement>, props: triggerProps }) : null}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              key="flyout"
              ref={panelRef}
              style={panelStyle}
              className={className}
              initial={{ opacity: 0, scale: 0.98, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default Flyout;


