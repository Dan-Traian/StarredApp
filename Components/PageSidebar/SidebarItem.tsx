"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type SidebarItemProps = {
  href: string;
  label: string;
  icon?: PhosphorIcon;
};

export default function SidebarItem({ href, label, icon: Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "flex items-center gap-2 px-3 py-1 rounded-md fade-sm",
        isActive
          ? "bg-gray-50"
          : "bg-transparent text-current hover:bg-white",
      ].join(" ")}
    >
      {Icon ? (
        <Icon
          size={18}
          weight="duotone"
       
        />
      ) : null}
      <span className="text-md">{label}</span>
    </Link>
  );
}


