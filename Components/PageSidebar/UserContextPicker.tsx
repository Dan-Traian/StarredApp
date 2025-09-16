"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as React from "react";
import Flyout from "@/Components/base/Flyout";
import Link from "next/link";

export default function UserContextPicker() {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="user-context-picker w-full flex items-center gap-2 pl-2 pr-3 py-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50"
      >
        <img src="https://placehold.co/100x100" className="w-6 h-6 rounded-xl" alt="" />
        <p className="flex-1 truncate text-md text-gray-800">Jane Smith</p>
        <CaretDownIcon size={20} className="text-gray-500" />
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef as unknown as React.RefObject<HTMLElement>}
        placement="top-start"
        matchTriggerWidth={true}
        className="rounded-md border border-gray-200 bg-white py-1 shadow-md"
      >
        <Link href="#" className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" onClick={() => setOpen(false)}>
          User settings
        </Link>
        <button className="block w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50">
          Beta feature
        </button>
        <button className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
          Logout
        </button>
      </Flyout>
    </div>
  );
}


