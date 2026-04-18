interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "accent"
    | "warning"
    | "error";
}

const variants = {
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    border: "border-primary/20",
    glow: "hover:shadow-primary/20",
  },
  secondary: {
    bg: "bg-secondary/10",
    icon: "text-secondary",
    border: "border-secondary/20",
    glow: "hover:shadow-secondary/20",
  },
  success: {
    bg: "bg-success/10",
    icon: "text-success",
    border: "border-success/20",
    glow: "hover:shadow-success/20",
  },
  info: {
    bg: "bg-info/10",
    icon: "text-info",
    border: "border-info/20",
    glow: "hover:shadow-info/20",
  },
  accent: {
    bg: "bg-accent/10",
    icon: "text-accent",
    border: "border-accent/20",
    glow: "hover:shadow-accent/20",
  },
  warning: {
    bg: "bg-warning/10",
    icon: "text-warning",
    border: "border-warning/20",
    glow: "hover:shadow-warning/20",
  },
  error: {
    bg: "bg-error/10",
    icon: "text-error",
    border: "border-error/20",
    glow: "hover:shadow-error/20",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "primary",
}: FeatureCardProps) {
  const style = variants[variant];

  return (
    <div
      className={`
        group
        card
        bg-base-100
        ${style.border}
        border
        shadow-sm
        hover:shadow-xl
        ${style.glow}
        transition-all duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
        cursor-pointer
      `}
    >
      <div className="card-body">
        {/* ICON */}
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${style.bg} ${style.icon}
            transition-all duration-300
            group-hover:scale-110
          `}
        >
          {icon}
        </div>

        {/* TITLE */}
        <h3 className="card-title mt-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-base-content/70 text-sm leading-relaxed">
            {description}
          </p>
        )}

        {/* OPTIONAL GAMING BADGE EFFECT */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition">
          <span className="text-xs badge badge-outline">Découvrir →</span>
        </div>
      </div>
    </div>
  );
}
