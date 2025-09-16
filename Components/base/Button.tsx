import * as React from "react";
import Link from "next/link";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  prefetch?: boolean;
}

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-primary-50 text-primary-90 hover:bg-primary-60 focus-visible:ring-gray-400 border border-primary-50 hover:border-primary-80 fade-sm cursor-pointer",
  secondary:
    "bg-gray-100 text-gray-200 border border-gray-400 hover:bg-gray-200 focus-visible:ring-gray-300",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
  outline:
    "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900",
  ghost: "hover:bg-gray-100 hover:text-gray-900",
  link: "text-blue-600 underline-offset-4 hover:underline bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2 rounded-full",
  sm: "h-8 rounded-full px-3",
  lg: "h-10 rounded-full px-8",
  icon: "h-9 rund-md w-9",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      iconLeft,
      iconRight,
      children,
      href,
      prefetch,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {iconLeft ? (
          <span className={cn(children ? "mr-2" : undefined)}>{iconLeft}</span>
        ) : null}
        {children}
        {iconRight ? (
          <span className={cn(children ? "ml-2" : undefined)}>{iconRight}</span>
        ) : null}
      </>
    );

    const commonClass = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (href) {
      const isDisabled = (props as any).disabled;
      if (isDisabled) {
        return (
          <span className={cn(commonClass, "pointer-events-none opacity-50")}>{content}</span>
        );
      }
      return (
        <Link href={href} prefetch={prefetch} className={commonClass} role="button">
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={commonClass} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;


