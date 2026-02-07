"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
    gradient?: boolean;
}

export default function SectionLabel({
    children,
    icon,
    className,
    gradient = false
}: SectionLabelProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "glass-card border border-white/10",
                "text-sm font-medium tracking-wide uppercase",
                gradient && "bg-gradient-to-r from-brand-purple/20 via-brand-cyan/20 to-brand-purple/20",
                "shadow-premium hover:shadow-premium-lg transition-all duration-300",
                className
            )}
        >
            {icon && (
                <motion.span
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                    className="text-brand-cyan"
                >
                    {icon}
                </motion.span>
            )}
            <span className="bg-gradient-to-r from-white via-brand-cyan to-white bg-clip-text text-transparent">
                {children}
            </span>
        </motion.div>
    );
}
