import { CaretDownIcon } from "@phosphor-icons/react";

export default function CompanyContextPicker() {
  return (
    <div className="organisation-context-picker flex items-center gap-2 pl-2 pr-4 py-2 bg-white rounded-xl">
        <img src="https://static.wixstatic.com/media/cb18c4_aaa5cc27347d4d1f809e1194612f74f6~mv2.jpg" className="w-10 h-10 rounded-xl" alt="" />
        <p className="w-full text-ellipsis  text-md text-gray-800">TrustPilot</p>
        <CaretDownIcon size={24}></CaretDownIcon>
      </div>
  );
}


