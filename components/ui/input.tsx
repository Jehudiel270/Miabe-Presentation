import type { InputHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "bordered" | "ghost";
  size?: Size;
  fullWidth?: boolean;
};

export default function Input({
  label,
  error,
  helperText,
  variant = "bordered",
  size,
  fullWidth = true,
  className = "",
  ...props
}: InputProps) {
  const containerClass = "form-control " + (fullWidth ? "w-full" : "");

  // map variant à une vraie classe DaisyUI
  const variantClass =
    variant === "bordered"
      ? "input-bordered"
      : variant === "ghost"
        ? "input-ghost"
        : ""; // default = juste "input"

  const inputClass =
    "input " +
    variantClass +
    " " +
    (size === "sm" ? "input-sm " : "") +
    (size === "lg" ? "input-lg " : "") +
    (error ? "input-error " : "") +
    className;

  return (
    <div className={containerClass}>
      {label && <label className="label-text mb-1">{label}</label>}

      <input className={inputClass.trim()} {...props} />

      {error ? (
        <span className="text-error text-sm mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-gray-500 text-sm mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}
