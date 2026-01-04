"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Scale, FileText } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function PoliciesPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-hero text-foreground relative overflow-hidden selection:bg-brand-purple/20 selection:text-brand-purple">
            {/* Background Ambience */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_1000px_400px_at_50%_-100px,var(--brand-purple),transparent)] opacity-[0.05] blur-3xl pointer-events-none -z-10" />

            <Navbar />

            <main className="relative z-10 mx-auto max-w-4xl px-6 pt-40 pb-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 space-y-6"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-brand-purple transition-colors mb-4 group">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        {t("nav.home") || "Back to Home"}
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                        Policies & <span className="text-brand-purple italic font-serif">Legal</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        Transparency and trust are at the core of our operations. Below you will find our terms of service, privacy policy, and other legal information.
                    </p>
                </motion.div>

                {/* Policies Content */}
                <div className="space-y-12">

                    {/* Privacy Policy */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-border/40"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                                <Shield className="size-6 text-brand-purple" />
                            </div>
                            <h2 className="text-2xl font-bold">Privacy Policy</h2>
                        </div>

                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                <strong>1. Data Collection</strong><br />
                                We collect minimal data necessary to improve your experience. This may include usage metrics and technical logs, which are anonymized where possible.
                            </p>
                            <p>
                                <strong>2. Usage of Information</strong><br />
                                Information collected is used solely for the purpose of maintaining and improving the Naga Codex platform. We do not sell or trade your personal data to third parties.
                            </p>
                            <p>
                                <strong>3. Security</strong><br />
                                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction.
                            </p>
                        </div>
                    </motion.section>

                    {/* Terms of Service */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-border/40"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                                <Scale className="size-6 text-brand-purple" />
                            </div>
                            <h2 className="text-2xl font-bold">Terms of Service</h2>
                        </div>

                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                <strong>1. Acceptance of Terms</strong><br />
                                By accessing Naga Codex, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                            </p>
                            <p>
                                <strong>2. Intellectual Property</strong><br />
                                The content, features, and functionality of Naga Codex are owned by us and are protected by international copyright, trademark, and other intellectual property rights.
                            </p>
                        </div>
                    </motion.section>

                    {/* Cookie Policy */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-border/40"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                                <FileText className="size-6 text-brand-purple" />
                            </div>
                            <h2 className="text-2xl font-bold">Cookie Policy</h2>
                        </div>

                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                            </p>
                        </div>
                    </motion.section>

                </div>

                {/* Footer Note */}
                <div className="mt-20 text-center border-t border-border/40 pt-10">
                    <p className="text-xs font-bold text-muted-foreground/40 tracking-widest uppercase">
                        Last updated: January 2026
                    </p>
                </div>

            </main>
        </div>
    );
}
