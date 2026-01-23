"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

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
      ease: "easeInOut" as const
    }
  },
};

const titleReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const
    },
  },
};

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonialsData = t("testimonials.items") || [];

  return (
    <motion.section
      className="scroll-mt-32 space-y-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <Badge variant="glass" className="bg-[var(--accent-green)]/10 text-[var(--accent-green)] border-[var(--accent-green)]/20 px-4 py-1.5 uppercase tracking-widest text-xs font-bold">
          {t("testimonials.badge")}
        </Badge>
        <motion.h2
          className="text-3xl md:text-6xl font-bold text-foreground tracking-tight"
          variants={titleReveal}
        >
          {t("testimonials.title1")} <span className="text-primary italic font-serif">{t("testimonials.title2")}</span>
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonialsData.map((testimonial: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-[2rem] border-primary/5 hover:border-primary hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.4)] hover:bg-primary/5 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <Quote className="size-8 text-[var(--accent-green)]/60 group-hover:text-[var(--accent-green)] transition-colors" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>
            <div className="space-y-1">
              <p className="text-foreground font-bold">
                {testimonial.name}
              </p>
              <p className="text-primary/70 text-sm font-medium">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}