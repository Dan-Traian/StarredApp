"use client";

import Link from "next/link";
import { SparkleIcon, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { describe } from "node:test";

type SidebarItemProps = {
  title: string;
  description?: string;
  icon?: PhosphorIcon;
  showAIContext?:boolean;
};

export default function KPICard({
  title,
  description,
  icon: Icon,
  showAIContext= false
}: SidebarItemProps) {
  return (
    <div className="kpi-card rounded-xl bg-gray-100  p-3 w-full flex flex-col gap-2">
      <div className="kpi-card-header flex gap-2 w-full p items-center">
        {Icon ? (
          <Icon size={18} weight="duotone" className="text-gray-500" />
        ) : null}
        <div className="meta w-full flex flex-col gap-1">
          <p className="text-md font-semibold w-full">{title}</p>
          {description && <p className="text-sm w-full">{description}</p>}
        </div>

        {showAIContext ? (
         <div className="bg-primary-60 p-1 flex items-center justify-center rounded-md"> <SparkleIcon size={14} weight="duotone" className="text-primary-90" /></div>
        ) : null}
      </div>

      <div className="content w-full rounded-xl bg-white border border-gray-200 min-h-72"></div>
    </div>
  );
}
