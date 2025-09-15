"use client";

import Link from "next/link";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type SidebarItemProps = {
  href: string;
  label: string;
  icon?: PhosphorIcon;
};

export default function SidebarItem({ href, label, icon: Icon }: SidebarItemProps) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-1 rounded-md bg-transparent text-current hover:bg-white fade-sm">
      {Icon ? <Icon size={18} weight="regular" /> : null}
      <span>{label}</span>
    </Link>
  );
}


