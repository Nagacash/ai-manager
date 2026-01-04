"use client";

import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, ArrowRight, Gavel, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

export default function AIActSection() {
    const { t } = useLanguage();

    const items = t("aiAct.items") || [];
    const icons = [FileSearch, ShieldAlert, ShieldCheck];

    return (
        <section id="ai-act" className="relative py-24 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[oklch(0.5_0.2_300/0.05)] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-[oklch(0.8_0.15_320/0.05)] rounded-full blur-[120px]" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-[oklch(0.5_0.2_300/0.1)] text-[oklch(0.5_0.2_300)] border-[oklch(0.5_0.2_300/0.1)] mb-6 px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold">
                            {t("aiAct.badge")}
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
                    >
                        {t("aiAct.title1")}{" "}
                        <span className="text-gradient">{t("aiAct.title2")}</span>
                        <br />
                        {t("aiAct.title3")}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("aiAct.description")}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {items.map((item: any, index: number) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="relative z-10 p-8 rounded-[2.5rem] bg-card border border-border hover:border-[oklch(0.5_0.2_300/0.3)] transition-all duration-500 overflow-hidden group"
                            >
                                <div className="size-14 rounded-2xl bg-[oklch(0.5_0.2_300/0.1)] flex items-center justify-center text-[oklch(0.5_0.2_300)] mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[var(--brand-purple)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[oklch(0.5_0.2_300/0.6)] uppercase tracking-widest">
                                    <CheckCircle2 className="size-4" />
                                    <span>{t("aiAct.essential")}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center"
                >
                    <Button className="rounded-full px-10 py-7 text-lg bg-primary hover:bg-black/90 text-white shadow-2xl shadow-[oklch(0.5_0.2_300/0.2)] hover:shadow-[oklch(0.5_0.2_300/0.4)] transition-all duration-500 group">
                        {t("aiAct.cta")}
                        <ArrowRight className="ml-2 size-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
