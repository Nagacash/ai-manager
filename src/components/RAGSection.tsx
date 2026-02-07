"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Database, Search, ShieldCheck, FileText, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useRef, MouseEvent } from "react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import PremiumButton from "@/components/PremiumButton";

export default function RAGSection() {
    const { t } = useLanguage();
    const icons = [Search, ShieldCheck, FileText];

    return (
        <div className="relative w-full max-w-6xl mx-auto py-32 px-4 overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1]
                }}
                className="text-center mb-20 space-y-6"
            >
                <div className="flex justify-center mb-6">
                    <SectionLabel icon={<Database className="size-4" />} gradient>
                        {t("rag.badge")}
                    </SectionLabel>
                </div>

                <motion.h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        {t("rag.title")}
                    </span>
                </motion.h2>

                <motion.p
                    className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {t("rag.subtitle")}
                </motion.p>
            </motion.div>

            {/* Premium Features Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="grid md:grid-cols-3 gap-8 mb-16"
            >
                {(t("rag.items") || []).map((item: any, index: number) => {
                    const Icon = icons[index];
                    return (
                        <MagneticCard key={index} index={index} item={item} Icon={Icon} />
                    );
                })}
            </motion.div>

            {/* Premium CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center"
            >
                <PremiumButton
                    variant="primary"
                    size="lg"
                    icon={<Zap className="size-5" />}
                >
                    {t("rag.cta")}
                </PremiumButton>
            </motion.div>
        </div>
    );
}

// Magnetic Card Component with Premium Effects
function MagneticCard({ item, Icon, index }: { item: any; Icon: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 300,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        stiffness: 300,
        damping: 30
    });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.8,
                        ease: [0.19, 1, 0.22, 1]
                    }
                }
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-full"
        >
            <GlassCard hover gradient className="h-full p-8">
                {/* Premium Icon Container */}
                <motion.div
                    className="mb-6 inline-flex p-4 rounded-2xl glass-card-deep border border-purple-500/30 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon className="size-8 text-purple-400 group-hover:text-cyan-400 transition-colors duration-500 relative z-10" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                    {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                    {item.description}
                </p>

                {/* Premium Hover Arrow */}
                <motion.div
                    className="mt-6 inline-flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                >
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="size-4" />
                </motion.div>

                {/* Premium Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />
                </div>
            </GlassCard>

            {/* Premium Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-cyan-500/10 group-hover:to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
        </motion.div>
    );
}
