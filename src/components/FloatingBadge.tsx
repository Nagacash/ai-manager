"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    variant?: "purple" | "cyan" | "pink";
}

export default function FloatingBadge({
    children,
    icon,
    className,
    variant = "purple",
}: FloatingBadgeProps) {
    const variantStyles = {
        purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
        cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
        pink: "border-pink-500/30 bg-pink-500/10 text-pink-400",
    };

    return (
        <motion.div
            className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-sm",
                variantStyles[variant],
                className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
            {icon && (
                <motion.span
                    className="w-2 h-2 rounded-full bg-current"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
            {children}
        </motion.div>
    );
}
