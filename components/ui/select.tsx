import type { SelectHTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "bordered" | "ghost";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode; // type explicite pour React children
  className?: string;
}

export default function Select({
  label,
  error,
  helperText,
  size = "md",
  variant = "bordered",
  fullWidth = true,
  className = "",
  children,
  ...props
}: SelectProps) {
  const containerClass = `form-control ${fullWidth ? "w-full" : ""}`.trim();

  const variantClass =
    variant === "bordered"
      ? "select-bordered"
      : variant === "ghost"
        ? "select-ghost"
        : "";

  const sizeClass =
    size === "sm" ? "select-sm" : size === "lg" ? "select-lg" : "";

  const errorClass = error ? "select-error" : "";

  const selectClass =
    `select ${variantClass} ${sizeClass} ${errorClass} ${className}`.trim();

  return (
    <div className={containerClass}>
      {label && <label className="label-text mb-1">{label}</label>}
      <select className={selectClass} {...props}>
        {children}
      </select>
      {error ? (
        <span className="text-error text-sm mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-gray-500 text-sm mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}
