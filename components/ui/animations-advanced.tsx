/**
 * Advanced animations with Framer Motion
 * Includes page transitions, component animations, and micro-interactions
 */

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * Page transition wrapper
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade In animation
 */
export function FadeInMotion({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In from left
 */
export function SlideInLeftMotion({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In from right
 */
export function SlideInRightMotion({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In from top
 */
export function SlideInTopMotion({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container for child animations
 */
export function StaggerContainerMotion({
  children,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.3,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item for use inside StaggerContainerMotion
 */
export function StaggerItemMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale and fade animation for cards
 */
export function ScaleInMotion({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover scale animation wrapper
 */
export function HoverScaleMotion({
  children,
  scale = 1.05,
}: {
  children: ReactNode;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover lift animation wrapper
 */
export function HoverLiftMotion({
  children,
  liftDistance = -8,
}: {
  children: ReactNode;
  liftDistance?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: liftDistance }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

/**
 * Bounce animation
 */
export function BounceMotion({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Loading pulse animation
 */
export function PulseMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rotate animation
 */
export function RotateMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated counter
 */
import { useEffect, useState } from "react";

export function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second
    const increment = value / (duration / 16); // 60fps

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        return next >= value ? value : next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return <motion.span>{Math.floor(count)}</motion.span>;
}

/**
 * Animated width bar (progress-like)
 */
export function AnimatedProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

/**
 * Modal backdrop and scaled content animation
 */
export function ModalMotion({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
          <motion.div
            className="z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Smooth scroll animate on element
 */
export function ScrollRevealMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
