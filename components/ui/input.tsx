import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconSrc?: string;
  onClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconSrc, onClick, ...props }, ref) => {
    return (
      <div className="relative">
        {iconSrc && (
          <Image
            src={iconSrc}
            alt="Icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
            onClick={onClick}
          />
        )}
        <input
          type={type}
          className={cn(
            "pl-10 h-14 w-full rounded-3xl px-6 py-3 text-sm font-normal ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray leading-[30px]focus-visible:outline-none text-white_second focus:outline-none focus-visible:ring-0 focus-visible:border-0 bg-input_bg focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 valid:bg-input_bg caret-white_second",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
