/**
 * Animation utilities and components
 * Provides smooth transitions and animations for EdTech platform
 */

import type { ReactNode } from "react";

/**
 * Fade in animation component
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 300,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <div
      className="animate-in fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Slide in from left animation
 */
export function SlideInLeft({
  children,
  delay = 0,
  duration = 300,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <div
      className="animate-in slide-in-from-left-4"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger children with fade-in animations
 */
export function StaggerContainer({
  children,
  staggerDelay = 100,
}: {
  children: ReactNode[];
  staggerDelay?: number;
}) {
  return (
    <>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <FadeIn key={index} delay={index * staggerDelay}>
              {child}
            </FadeIn>
          ))
        : children}
    </>
  );
}

/**
 * Pulse animation for loading states
 */
export function PulseLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  }[size];

  return (
    <span
      className={`loading loading-spinner ${sizeClass} text-primary`}
      role="status"
      aria-label="Chargement..."
    />
  );
}

/**
 * Bounce animation on mount
 */
export const bounceIn = `
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-bounce-in {
    animation: bounceIn 0.5s ease-out forwards;
  }
`;

/**
 * Hover scale animation
 */
export const hoverScale = `
  .hover-scale {
    transition: transform 0.3s ease-out;
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }
`;

/**
 * Smooth page transition
 */
export const pageTransition = `
  @keyframes pageIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .page-transition {
    animation: pageIn 0.4s ease-out;
  }
`;
