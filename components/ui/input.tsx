import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-[24px] px-6 py-3 text-sm font-normal ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray leading-[30px]focus-visible:outline-none text-white_second focus:outline-none focus-visible:ring-0 focus-visible:border-0 bg-input_bg focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 valid:bg-input_bg caret-white_second",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
