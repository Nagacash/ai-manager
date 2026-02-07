"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
}

export default function PremiumButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  magnetic = true,
  className,
  ...props
}: PremiumButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ripple-effect focus-premium";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-premium-md hover:shadow-premium-lg",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-white/50 shadow-premium-sm hover:shadow-premium-md",
    outline:
      "bg-transparent border-2 border-slate-700 hover:border-white text-slate-300 hover:text-white hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        magnetic && "magnetic-hover",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
    >
      {icon && iconPosition === "left" && (
        <motion.span
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <motion.span
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
}
