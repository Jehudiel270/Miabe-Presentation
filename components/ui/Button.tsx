import type { ButtonHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : variant === "ghost"
          ? "btn-ghost"
          : "btn-error";

  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClass = `
    btn
    ${variantClass}
    ${sizeClass}
    ${widthClass}
    ${className}
  `.trim();

  return <button className={buttonClass} {...props} />;
}
