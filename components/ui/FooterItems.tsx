interface FooterItemsProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "accent"
    | "warning"
    | "error";
  children?: React.ReactNode;
}

const variants = {
  primary: {
    icon: "text-primary",
  },
  secondary: {
    icon: "text-secondary",
  },
  success: {
    icon: "text-success",
  },
  info: {
    icon: "text-info",
  },
  accent: {
    icon: "text-accent",
  },
  warning: {
    icon: "text-warning",
  },
  error: {
    icon: "text-error",
  },
};

export function FooterItems({
  title,
  description,
  icon,
  children,
  variant = "primary",
}: FooterItemsProps) {
  const style = variants[variant];

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`text-2xl shrink-0 ${style.icon}`}>{icon}</div>
        )}
        <div>
          <h3 className="text-lg font-bold text-base-content">{title}</h3>
          {description && (
            <p className="text-sm text-base-content/70 mt-1">{description}</p>
          )}
        </div>
      </div>
      {children && (
        <ul className="flex flex-col gap-2 list-none pl-8">{children}</ul>
      )}
    </div>
  );
}
