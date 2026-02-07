"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldAlert, CheckCircle2, ArrowRight, Gavel, FileSearch, ShieldCheck } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import PremiumButton from "@/components/PremiumButton";

export default function AIActSection() {
    const { t } = useLanguage();
    const items = t("aiAct.items") || [];
    const icons = [FileSearch, ShieldAlert, ShieldCheck];

    return (
        <div className="relative w-full max-w-6xl mx-auto py-32 px-4 overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-[140px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-0 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[140px]"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.4, 0.2, 0.4]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
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
                    <SectionLabel icon={<Gavel className="size-4" />} gradient>
                        {t("aiAct.badge")}
                    </SectionLabel>
                </div>

                <motion.h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
                        {t("aiAct.title")}
                    </span>
                </motion.h2>

                <motion.p
                    className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {t("aiAct.subtitle")}
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
                {items.map((item: any, index: number) => {
                    const Icon = icons[index];
                    return (
                        <ComplianceCard key={index} item={item} Icon={Icon} />
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
                    icon={<CheckCircle2 className="size-5" />}
                >
                    {t("aiAct.cta")}
                </PremiumButton>
            </motion.div>
        </div>
    );
}

// Compliance Card Component with Premium Effects
function ComplianceCard({ item, Icon }: { item: any; Icon: any }) {
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
                    className="mb-6 inline-flex p-4 rounded-2xl glass-card-deep border border-emerald-500/30 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon className="size-8 text-emerald-400 group-hover:text-blue-400 transition-colors duration-500 relative z-10" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500">
                    {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                    {item.description}
                </p>

                {/* Premium Hover Arrow */}
                <motion.div
                    className="mt-6 inline-flex items-center gap-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                >
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="size-4" />
                </motion.div>

                {/* Premium Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20" />
                </div>
            </GlassCard>

            {/* Premium Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/0 via-blue-500/0 to-emerald-500/0 group-hover:from-emerald-500/20 group-hover:via-blue-500/10 group-hover:to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
        </motion.div>
    );
}
