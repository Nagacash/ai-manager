"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  ShieldCheck,
  LineChart,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesCarousel() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const icons = [BrainCircuit, ShieldCheck, LineChart, ShieldCheck, Headphones];
  const colors = ["#a855f7", "#22d3ee", "#ec4899", "#10b981", "#f59e0b"];

  const translatedItems = t("services.items");
  const safeItems = Array.isArray(translatedItems) ? translatedItems : [];

  const services = safeItems.map((item: any, index: number) => ({
    ...item,
    icon: icons[index % icons.length],
    color: colors[index % colors.length],
  }));

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(
      (prevIndex) =>
        (prevIndex + newDirection + services.length) % services.length,
    );
  };

  const service = services[activeIndex];

  if (!service) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6">
      <div className="glass-panel rounded-[2.5rem] overflow-hidden border-border/40 shadow-2xl bg-card/30 backdrop-blur-3xl">
        <div className="p-10 md:p-14 lg:p-20 flex flex-col justify-center space-y-10 relative z-10 min-h-[500px]">
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
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                  border: `1px solid ${service.color}40`,
                }}
              >
                <service.icon className="size-10" />
              </div>

              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] text-glow-strong">
                  {service.title}
                </h3>
                <p className="text-xl text-slate-400 leading-relaxed">
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
                    className="flex items-center gap-4 text-slate-300 font-medium text-lg"
                  >
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-6 pt-8">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                className="size-14 rounded-full border-border/60 hover:bg-brand-cyan hover:text-background hover:border-brand-cyan transition-all duration-300"
              >
                <ChevronLeft className="size-7" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                className="size-14 rounded-full border-border/60 hover:bg-brand-cyan hover:text-background hover:border-brand-cyan transition-all duration-300"
              >
                <ChevronRight className="size-7" />
              </Button>
            </div>

            <div className="h-px flex-1 bg-border/40" />

            <div className="text-xs font-bold text-slate-600 tracking-[0.3em] uppercase">
              {String(activeIndex + 1).padStart(2, "0")} —{" "}
              {String(services.length).padStart(2, "0")}
            </div>
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
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "w-16 bg-brand-cyan"
                : "w-4 bg-slate-700 hover:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
