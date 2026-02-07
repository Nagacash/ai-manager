"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
}

export default function GlassCard({
    children,
    className,
    hover = true,
    gradient = false,
}: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "glass-premium rounded-2xl p-8",
                hover && "hover-lift card-tilt",
                gradient && "gradient-border",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
            {children}
        </motion.div>
    );
}
