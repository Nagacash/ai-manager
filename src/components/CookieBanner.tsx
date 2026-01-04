"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem("cookie-consent");
        if (!cookieConsent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[26rem] z-50"
                >
                    <div className="glass-panel p-6 rounded-[2rem] border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-3xl bg-background/80 relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute -right-10 -top-10 size-32 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="size-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                                    <Cookie className="size-5 text-brand-purple" />
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold mb-1">We value your privacy</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    We use cookies to enhance your browsing experience and analyze, measure our traffic.{" "}
                                    <Link href="/policies" className="text-brand-purple hover:underline">
                                        Learn more
                                    </Link>
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-xl h-10 font-bold border-border/50 hover:bg-muted/50"
                                    onClick={handleDecline}
                                >
                                    Decline
                                </Button>
                                <Button
                                    className="flex-1 rounded-xl h-10 font-bold bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/20"
                                    onClick={handleAccept}
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
