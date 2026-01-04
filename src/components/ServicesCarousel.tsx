"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BrainCircuit, ShieldCheck, LineChart, CheckCircle2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesCarousel() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const icons = [BrainCircuit, ShieldCheck, LineChart, ShieldCheck, Headphones];
    const images = ["/images/video-content.png", "/images/automation-systems.png", "/images/nagaweb1.png", "/images/automation-systems.png", "/images/nagaai.png"];
    const colors = ["oklch(0.6 0.2 300)", "oklch(0.7 0.15 300)", "oklch(0.65 0.18 320)", "oklch(0.55 0.2 300)", "oklch(0.5 0.2 300)"];

    const translatedItems = t("services.items");
    const safeItems = Array.isArray(translatedItems) ? translatedItems : [];

    const services = safeItems.map((item: any, index: number) => ({
        ...item,
        icon: icons[index % icons.length],
        image: images[index % images.length],
        color: colors[index % colors.length],
    }));

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setActiveIndex((prevIndex) => (prevIndex + newDirection + services.length) % services.length);
    };

    const service = services[activeIndex];

    if (!service) return null;

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6">
            <div className="glass-panel rounded-[3.5rem] overflow-hidden border-border/40 shadow-2xl bg-card/30 backdrop-blur-3xl">
                <div className="grid lg:grid-cols-[1fr_1.1fr] items-stretch min-h-[600px]">
                    {/* Left: Content Area */}
                    <div className="p-10 md:p-14 lg:p-20 flex flex-col justify-center space-y-10 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8"
                            >
                                <div
                                    className="size-20 rounded-[2rem] flex items-center justify-center shadow-xl mb-8"
                                    style={{
                                        backgroundColor: `oklch(from ${service.color} l c h / 0.1)`,
                                        color: service.color,
                                        border: `1px solid oklch(from ${service.color} l c h / 0.2)`
                                    }}
                                >
                                    <service.icon className="size-10" />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-5xl md:text-6xl font-bold text-foreground tracking-tighter leading-[1.05]">
                                        {service.title}
                                    </h3>
                                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 pt-6">
                                    {(service.features || []).map((feature: string, i: number) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className="flex items-center gap-4 text-foreground/80 font-semibold text-base"
                                        >
                                            <div className="size-2 rounded-full bg-brand-purple/40" />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center gap-6 pt-12">
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => paginate(-1)}
                                    className="size-14 rounded-full border-border/60 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300"
                                >
                                    <ChevronLeft className="size-7" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => paginate(1)}
                                    className="size-14 rounded-full border-border/60 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300"
                                >
                                    <ChevronRight className="size-7" />
                                </Button>
                            </div>

                            <div className="h-px flex-1 bg-border/40" />

                            <div className="text-xs font-bold text-muted-foreground/40 tracking-[0.3em] uppercase">
                                {String(activeIndex + 1).padStart(2, '0')} — {String(services.length).padStart(2, '0')}
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Area */}
                    <div className="relative overflow-hidden bg-muted/50 min-h-[300px] lg:min-h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10 lg:to-white/20" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Pagination Bar */}
            <div className="flex justify-center gap-3 mt-12">
                {services.map((_: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > activeIndex ? 1 : -1);
                            setActiveIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-16 bg-primary" : "w-4 bg-slate-200 hover:bg-slate-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
