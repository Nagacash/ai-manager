"use client";

import { motion } from "framer-motion";
import { Database, Search, ShieldCheck, FileText, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function RAGSection() {
    const { t } = useLanguage();

    const icons = [Search, ShieldCheck, FileText];

    return (
        <div className="relative w-full max-w-6xl mx-auto py-24 px-4 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[oklch(0.5_0.2_300/0.05)] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[oklch(0.8_0.15_320/0.05)] rounded-full blur-[120px]" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Badge variant="glass" className="bg-[oklch(0.5_0.2_300/0.1)] text-[oklch(0.5_0.2_300)] border-[oklch(0.5_0.2_300/0.2)] px-4 py-2">
                            {t("rag.badge")}
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                            {t("rag.title1")} <span className="text-[var(--brand-purple)] italic font-serif">{t("rag.title2")}</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                            {t("rag.description")}
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {t("rag.items").map((item: any, idx: number) => {
                            const Icon = icons[idx];
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="flex-shrink-0 size-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[var(--brand-purple)] group-hover:scale-110 group-hover:bg-[var(--brand-purple)] group-hover:text-white transition-all duration-300">
                                        <Icon className="size-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Architectural Visualization */}
                <div className="relative">
                    <motion.div
                        className="glass-panel p-8 md:p-12 rounded-[3.5rem] bg-white/40 border-white/60 shadow-2xl relative z-10 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* Diagram Content */}
                        <div className="space-y-12 relative z-10">
                            <div className="flex justify-center gap-4">
                                <div className="px-6 py-4 rounded-2xl bg-slate-900 text-white flex flex-col items-center gap-2 shadow-xl">
                                    <FileText className="size-6 text-[var(--brand-purple)]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Knowledge Base</span>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="size-1 bg-gradient-to-b from-[var(--brand-purple)] to-accent h-12 w-0.5" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center gap-3">
                                    <Database className="size-6 text-indigo-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Vector Store</span>
                                </div>
                                <div className="p-6 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center gap-3">
                                    <Zap className="size-6 text-amber-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">LLM Engine</span>
                                </div>
                            </div>

                            <div className="flex justify-center -my-6">
                                <div className="bg-[var(--brand-purple)] size-10 rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--brand-purple)]/20 z-20">
                                    <ArrowRight className="size-5 rotate-90" />
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--brand-purple)] to-[var(--brand-purple)]/80 text-white shadow-2xl flex items-center justify-between group cursor-default">
                                <div className="flex gap-4 items-center">
                                    <div className="size-12 rounded-xl bg-[oklch(0.5_0.2_300/0.1)] flex items-center justify-center text-[oklch(0.5_0.2_300)]">
                                        <ShieldCheck className="size-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Verified Answer</h4>
                                        <p className="text-xs opacity-70">With full citations & data privacy</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid Pattern Overlay */}
                        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                        />
                    </motion.div>

                    {/* Floating Accents */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 -right-6 size-24 bg-[var(--brand-purple)]/20 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-10 -left-6 size-32 bg-indigo-500/20 rounded-full blur-3xl"
                    />
                </div>
            </div>
        </div>
    );
}
