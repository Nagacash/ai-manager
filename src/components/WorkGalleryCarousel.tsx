"use client";

import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function WorkGalleryCarousel() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const images = ["/images/meso.png", "/images/nat.png", "/images/nagaai.png"];
    const translatedItems = t("work.items") || [];

    const projects = translatedItems.map((item: any, index: number) => ({
        ...item,
        src: images[index % images.length],
    }));

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setActiveIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
    };

    if (projects.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden py-4 px-4">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/40 bg-slate-900 shadow-2xl group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={{
                            enter: (direction: number) => ({
                                x: direction > 0 ? "100%" : "-100%",
                                opacity: 0,
                                scale: 1.1,
                            }),
                            center: {
                                zIndex: 1,
                                x: 0,
                                opacity: 1,
                                scale: 1,
                            },
                            exit: (direction: number) => ({
                                zIndex: 0,
                                x: direction < 0 ? "100%" : "-100%",
                                opacity: 0,
                                scale: 0.95,
                            }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.6 },
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={projects[activeIndex].src}
                            alt={projects[activeIndex].title}
                            fill
                            className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                            priority
                            unoptimized
                        />
                        {/* Soft Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-3xl space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="space-y-3"
                            >
                                <Badge className="bg-[oklch(0.5_0.2_300/0.1)] text-white border-[oklch(0.5_0.2_300/0.25)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                    {projects[activeIndex].category}
                                </Badge>
                                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">
                                    {projects[activeIndex].title}
                                </h3>
                                <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
                                    {projects[activeIndex].description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 transition-all gap-2 group/btn">
                                    <a href={projects[activeIndex].link} target="_blank" rel="noopener noreferrer">
                                        {t("work.explore")}
                                        <ArrowUpRight className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Custom Navigation */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-x-6 flex justify-between z-20 pointer-events-none">
                    <Button
                        variant="glass"
                        size="icon"
                        onClick={() => paginate(-1)}
                        className="size-14 rounded-full border-white/20 bg-white/5 backdrop-blur-xl text-white pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft className="size-8" />
                    </Button>
                    <Button
                        variant="glass"
                        size="icon"
                        onClick={() => paginate(1)}
                        className="size-14 rounded-full border-white/20 bg-white/5 backdrop-blur-xl text-white pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight className="size-8" />
                    </Button>
                </div>

                {/* Progress Dots */}
                <div className="absolute right-12 bottom-12 flex gap-3 z-20">
                    {projects.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > activeIndex ? 1 : -1);
                                setActiveIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-12 bg-[var(--brand-purple)]" : "w-3 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
