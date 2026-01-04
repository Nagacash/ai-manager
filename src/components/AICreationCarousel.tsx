"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function AICreationCarousel() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const images = [
        "/images/ai-creation/perfume_mockup.png",
        "/images/ai-creation/fashion_campaign.png",
        "/images/ai-creation/bespoke_brand_art.png",
        "/images/ai-creation/lifestyle_brand_photo.png",
    ];

    const translatedItems = t("services.aiCreationItems") || [];
    const items = translatedItems.map((item: any, index: number) => ({
        ...item,
        src: images[index % images.length],
    }));

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setActiveIndex((prevIndex) => (prevIndex + newDirection + items.length) % items.length);
    };

    if (items.length === 0) return null;

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/10 backdrop-blur-md shadow-2xl">
            <div className="relative aspect-[16/10] md:aspect-[21/9] w-full group overflow-hidden">
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
                                scale: 0.9,
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
                            src={items[activeIndex].src}
                            alt={items[activeIndex].alt}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <motion.div
                            className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                {items[activeIndex].title}
                            </h3>
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                                {items[activeIndex].description}
                            </p>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <Button
                        variant="glass"
                        size="icon"
                        onClick={() => paginate(-1)}
                        className="size-12 rounded-full border-white/20 bg-white/10 backdrop-blur-lg text-white pointer-events-auto opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform -translate-x-0 lg:-translate-x-4 lg:group-hover:translate-x-0 bg-black/20 lg:bg-white/10"
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        variant="glass"
                        size="icon"
                        onClick={() => paginate(1)}
                        className="size-12 rounded-full border-white/20 bg-white/10 backdrop-blur-lg text-white pointer-events-auto opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-x-0 lg:translate-x-4 lg:group-hover:translate-x-0 bg-black/20 lg:bg-white/10"
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 right-8 flex gap-2 z-10">
                    {items.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > activeIndex ? 1 : -1);
                                setActiveIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
