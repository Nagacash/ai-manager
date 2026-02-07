"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
    variant?: "gradient" | "dots" | "wave";
}

export default function SectionDivider({ variant = "gradient" }: SectionDividerProps) {
    if (variant === "gradient") {
        return (
            <div className="relative w-full h-px my-24">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                />
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75" />
                </motion.div>
            </div>
        );
    }

    if (variant === "dots") {
        return (
            <div className="flex items-center justify-center gap-3 my-24">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                    />
                ))}
            </div>
        );
    }

    // Wave variant
    return (
        <div className="relative w-full h-24 my-24 overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0,50 Q300,10 600,50 T1200,50"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
