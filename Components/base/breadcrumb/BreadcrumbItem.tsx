"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";
import Flyout from "../Flyout";
import { useBreadcrumbContext } from "./Breadcrumb";

type DropdownOption = {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export interface BreadcrumbItemProps {
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
  icon?: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  onlyIcon?: boolean;
  dropdownOptions?: DropdownOption[];
  children?: React.ReactNode;
}

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function BreadcrumbItem({
  href,
  onClick,
  isCurrent,
  icon,
  avatarSrc,
  avatarAlt,
  onlyIcon,
  dropdownOptions,
  children,
}: BreadcrumbItemProps) {
  const { separator, homeHref } = useBreadcrumbContext();

  const containerRef = React.useRef<HTMLLIElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const hasDropdown = Array.isArray(dropdownOptions) && dropdownOptions.length > 0;

  const label = onlyIcon ? null : children;

  // positioning handled by Flyout

  const content = (
    <>
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={avatarAlt ?? ""}
          width={18}
          height={18}
          className="rounded-full"
        />
      ) : null}
      {icon ? <span className="text-gray-600">{icon}</span> : null}
      {label ? <span className="text-sm text-gray-800">{label}</span> : null}
    </>
  );

  const itemClass = cn(
    "inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100",
    isCurrent && "bg-gray-100 text-gray-900"
  );

  const ButtonLike = (
    <button
      type="button"
      onClick={() => (hasDropdown ? setOpen((v) => !v) : onClick?.())}
      className={itemClass}
      ref={triggerRef}
      aria-current={isCurrent ? "page" : undefined}
      aria-haspopup={hasDropdown ? "listbox" : undefined}
      aria-expanded={hasDropdown ? open : undefined}
    >
      {content}
      {hasDropdown ? <CaretDown size={14} className="text-gray-500" /> : null}
    </button>
  );

  return (
    <li ref={containerRef} className="flex items-center gap-2">
      {href ? (
        <Link href={href} className={itemClass} aria-current={isCurrent ? "page" : undefined}>
          {content}
        </Link>
      ) : (
        ButtonLike
      )}

      {hasDropdown ? (
        <Flyout
          open={open}
          onOpenChange={setOpen}
          anchorRef={triggerRef as unknown as React.RefObject<HTMLElement>}
          placement="bottom-start"
          className="max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-md"
        >
          {dropdownOptions!.map((opt, idx) => {
            const key = `${idx}-${typeof opt.label === "string" ? opt.label : "opt"}`;
            const item = (
              <button
                key={key}
                role="option"
                disabled={opt.disabled}
                onClick={() => {
                  setOpen(false);
                  if (opt.onClick) opt.onClick();
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50",
                  opt.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {opt.label}
              </button>
            );
            if (opt.href && !opt.disabled) {
              return (
                <Link key={key} href={opt.href} className="block" onClick={() => setOpen(false)}>
                  {item}
                </Link>
              );
            }
            return item;
          })}
        </Flyout>
      ) : null}

      <span className="text-gray-400">{separator}</span>
    </li>
  );
}


