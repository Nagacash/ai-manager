"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function WorkGalleryCarousel() {
  const { t } = useLanguage();
  const projects = t("work.items") || [];

  if (projects.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {projects.map((project: any, index: number) => (
        <motion.a
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-purple-500/5 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-start gap-5 flex-1 min-w-0">
            <div className="hidden sm:flex size-12 rounded-xl bg-purple-500/10 border border-purple-500/20 items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
              <Globe className="size-5 text-purple-400" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <span className="hidden md:inline text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400/60 border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed line-clamp-2">
                {project.description}
              </p>
              {project.link && project.link !== "#" && (
                <p className="text-xs text-slate-500 font-mono pt-1 group-hover:text-purple-400/70 transition-colors truncate">
                  {project.link.replace(/^https?:\/\//, "")}
                </p>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 size-10 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all">
            <ArrowUpRight className="size-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
