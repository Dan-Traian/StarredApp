"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type SidebarItemProps = {
  href: string;
  label: string;
  icon?: PhosphorIcon;
  onClick?: () => void;
};

export default function SidebarItem({ href, label, icon: Icon, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  const content = (
    <>
      {Icon ? (
        <Icon
          size={18}
          weight="duotone"
          className="text-gray-500"
        />
      ) : null}
      <span className="text-md">{label}</span>
    </>
  );

  const className = [
    "flex items-center gap-2 px-3 py-1 rounded-md fade-sm",
    isActive
      ? "bg-gray-50"
      : "bg-transparent text-current hover:bg-white",
  ].join(" ");

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={className}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}


