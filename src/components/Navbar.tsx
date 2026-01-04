"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: t("nav.about"), href: "#hero" },
        { name: t("nav.services"), href: "#services" },
        { name: t("nav.audio"), href: "#audio" },
        { name: t("nav.work"), href: "#work" },
        { name: t("nav.highlights"), href: "#highlights" },
        { name: t("nav.codex"), href: "#codex" },
        { name: t("nav.certifications"), href: "/certifications" },
        { name: t("nav.contact"), href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const isHomePage = pathname === "/";

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            if (isHomePage) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
            // If not on homepage, let the link navigate normally to /#section
        } else if (href === "/" && isHomePage) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getHref = (href: string) => {
        if (href.startsWith("#") && !isHomePage) {
            return `/${href}`;
        }
        return href;
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            transition: {
                duration: 0.2,
                ease: "easeInOut" as const,
            },
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut" as const,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        closed: { opacity: 0, x: -10 },
        open: { opacity: 1, x: 0 },
    };

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-7xl px-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={`glass-panel rounded-none rounded-b-2xl border-x-0 border-t-0 px-6 py-4 flex items-center justify-between gap-8 shadow-2xl transition-all duration-500 ${scrolled ? 'py-3' : ''}`}>
                <Link
                    href="/"
                    onClick={(e) => {
                        if (isHomePage) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                    className="flex items-center smooth-transition hover:opacity-80 dark:invert"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Naga Codex Logo"
                        width={130}
                        height={40}
                        className={`w-auto transition-all duration-500 ${scrolled ? 'h-6' : 'h-7'}`}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-10 lg:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={getHref(item.href)}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-[11px] font-bold text-foreground/60 hover:text-foreground tracking-[0.25em] uppercase transition-all duration-300 relative group/link"
                        >
                            {item.name}
                            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-purple rounded-full transition-all duration-300 group-hover/link:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-8 lg:flex">
                    <LanguageToggle />
                    <Button asChild size="sm" className="rounded-full px-7 bg-foreground text-background hover:bg-foreground/90 border-none shadow-lg shadow-foreground/5 font-bold transition-all hover:-translate-y-0.5 active:translate-y-0">
                        <a href="mailto:chosenfewrecords@hotmail.de">{t("nav.startBuild")}</a>
                    </Button>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-4 lg:hidden">
                    <LanguageToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="absolute top-20 left-4 right-4 bg-background/90 backdrop-blur-3xl rounded-[2rem] border border-border/40 p-8 shadow-2xl lg:hidden overflow-hidden z-50 max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((item) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={getHref(item.href)}
                                        onClick={(e) => {
                                            handleNavClick(e, item.href);
                                            setIsOpen(false);
                                        }}
                                        className="text-xs font-black text-foreground/60 hover:text-brand-purple tracking-[0.3em] uppercase block py-3 border-b border-border/20 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={itemVariants} className="pt-6">
                                <Button asChild className="w-full rounded-2xl h-14 bg-foreground text-background hover:bg-foreground/90 font-bold shadow-xl" onClick={() => setIsOpen(false)}>
                                    <a href="mailto:chosenfewrecords@hotmail.de" className="flex items-center justify-center gap-2">
                                        {t("nav.startBuild")}
                                        <ArrowUpRight className="size-5" />
                                    </a>
                                </Button>
                            </motion.div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-20 -right-20 size-60 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -top-20 -left-20 size-60 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
