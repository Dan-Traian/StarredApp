"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as React from "react";
import Flyout from "@/Components/base/Flyout";

export default function CompanyContextPicker() {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const companies = [
    { name: "TrustPilot", logo: "https://static.wixstatic.com/media/cb18c4_aaa5cc27347d4d1f809e1194612f74f6~mv2.jpg" },
    { name: "Acme Inc", logo: "https://placehold.co/64x64" },
    { name: "Globex", logo: "https://placehold.co/64x64?text=G" },
  ];

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="organisation-context-picker w-full flex items-center gap-2 pl-2 pr-3 py-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50"
      >
        <img src="https://static.wixstatic.com/media/cb18c4_aaa5cc27347d4d1f809e1194612f74f6~mv2.jpg" className="w-10 h-10 rounded-xl" alt="" />
        <p className="flex-1 truncate text-md text-gray-800">TrustPilot</p>
        <CaretDownIcon size={20} className="text-gray-500" />
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef as unknown as React.RefObject<HTMLElement>}
        placement="bottom-start"
        matchTriggerWidth={true}
        className="max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-md"
      >
        {companies.map((c) => (
          <button
            key={c.name}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            <img src={c.logo} alt="" className="w-6 h-6 rounded-md" />
            <span>{c.name}</span>
          </button>
        ))}
      </Flyout>
    </div>
  );
}


