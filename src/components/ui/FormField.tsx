import type React from "react";
import clsx from "clsx";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
      {children}
    </div>
  );
}
