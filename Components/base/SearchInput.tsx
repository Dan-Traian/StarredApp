import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "h-9 w-full rounded-md border bg-white pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-400 transition focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50";

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <div className="relative">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          ref={ref}
          type="search"
          className={cn(
            baseClasses,
            invalid ? "border-red-400 focus-visible:ring-red-400" : "border-gray-300 focus-visible:ring-gray-300",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;


