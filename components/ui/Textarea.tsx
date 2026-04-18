import type { TextareaHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "bordered" | "ghost";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  variant?: Variant;
  fullWidth?: boolean;
  noResize?: boolean; // ← nouvelle prop
}

export default function Textarea({
  label,
  error,
  helperText,
  size = "md",
  variant = "bordered",
  fullWidth = true,
  noResize = false, // default false
  className = "",
  ...props
}: TextareaProps) {
  const containerClass = "form-control " + (fullWidth ? "w-full" : "");

  const variantClass =
    variant === "bordered"
      ? "textarea-bordered"
      : variant === "ghost"
        ? "textarea-ghost"
        : "";

  const sizeClass =
    size === "sm" ? "textarea-sm" : size === "lg" ? "textarea-lg" : "";

  const errorClass = error ? "textarea-error" : "";

  const resizeClass = noResize ? "resize-none" : ""; // ← applique resize-none si true

  const textareaClass =
    `textarea ${variantClass} ${sizeClass} ${errorClass} ${resizeClass} ${className}`.trim();

  return (
    <div className={containerClass}>
      {label && <label className="label-text mb-1">{label}</label>}
      <textarea className={textareaClass} {...props} />
      {error ? (
        <span className="text-error text-sm mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-gray-500 text-sm mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}
