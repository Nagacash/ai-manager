"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import AnimatedHeader from "./AnimatedHeader";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

const titleReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonialsData = t("testimonials.items") || [];

  return (
    <motion.section
      className="scroll-mt-32 space-y-12 dark bg-slate-950 py-12 px-4 rounded-3xl"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <Badge
          variant="glass"
          className="bg-white/10 text-white border-white/30 px-4 py-1.5 uppercase tracking-widest text-xs font-bold"
        >
          {t("testimonials.badge")}
        </Badge>
        <AnimatedHeader
          as="h2"
          className="text-3xl md:text-6xl font-bold !text-white tracking-tight"
        >
          {t("testimonials.title1")}{" "}
          <span
            className="!text-white italic font-serif"
            style={{ color: "white" }}
          >
            {t("testimonials.title2")}
          </span>
        </AnimatedHeader>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonialsData.map((testimonial: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-[2rem] border border-white/30 bg-slate-900 transition-all duration-300 group hover:border-white/60"
          >
            <div className="flex items-start justify-between mb-6">
              <Quote className="size-8 text-[var(--accent-green)]/60 group-hover:text-[var(--accent-green)] transition-colors" />
            </div>
            <p
              className="!text-white leading-relaxed mb-6 italic font-medium"
              style={{ color: "white" }}
            >
              "{testimonial.quote}"
            </p>
            <div className="space-y-1">
              <p className="!text-white font-bold" style={{ color: "white" }}>
                {testimonial.name}
              </p>
              <p
                className="!text-white/90 text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
