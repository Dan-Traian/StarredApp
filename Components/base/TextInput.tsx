import * as React from "react";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "flex h-9 w-full rounded-md border bg-white px-3 text-sm text-gray-800 placeholder:text-gray-400 transition focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50";

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          invalid ? "border-red-400 focus-visible:ring-red-400" : "border-gray-300 focus-visible:ring-gray-300",
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;


