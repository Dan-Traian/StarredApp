import { CaretDownIcon } from "@phosphor-icons/react";

export default function UserContextPicker() {
  return (
    <div className="user-context-picker flex items-center gap-2 pl-2 pr-4 py-2 bg-white rounded-xl">
        <img src="https://placehold.co/100x100" className="w-6 h-6 rounded-xl" alt="" />
        <p className="w-full text-ellipsis  text-md text-gray-800">Jane Smith</p>
        <CaretDownIcon size={24}></CaretDownIcon>
      </div>
  );
}


