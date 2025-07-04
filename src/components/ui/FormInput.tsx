import type React from "react"
import { forwardRef } from "react"
import clsx from "clsx"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full px-4 py-3 border rounded-lg text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200",
        "bg-slate-800/50 text-white",
        error ? "border-red-500" : "border-slate-600",
        className,
      )}
      {...props}
    />
  )
})
FormInput.displayName = "FormInput"
