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
  const { t, lang } = useLanguage();
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // If not on homepage, let the link navigate to /#section (don't prevent default)
    } else if (href === "/" && isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // For other links, let default navigation happen

    setIsOpen(false);
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
      <div
        className={`relative bg-black/95 backdrop-blur-xl rounded-none rounded-b-2xl px-6 py-4 flex items-center justify-between gap-8 shadow-2xl transition-all duration-500 ${scrolled ? "py-3 bg-black/98" : ""}`}
      >
        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <Link
          href="/"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="cyber-nav-item cyber-focus text-[11px] font-bold text-slate-300 hover:text-white tracking-[0.25em] uppercase transition-all duration-300 relative group/link"
        >
          <Image
            src="/images/logo.png"
            alt="Naga Codex Logo"
            width={130}
            height={40}
            className={`w-auto transition-all duration-500 filter brightness(0) contrast(200%) ${scrolled ? "h-6" : "h-7"}`}
            priority
          />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-10 lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`cyber-nav-item cyber-focus flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                pathname === link.href ? "text-white" : "text-white"
              }`}
              role="menuitem"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-8 lg:flex">
          <LanguageToggle />
          <Button
            asChild
            size="sm"
            className="accessible-cyber-button cyber-focus text-white hover:text-cyan-400 hover:bg-cyan-500/20 border-none shadow-lg shadow-cyan-500/30 font-bold transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <a href="mailto:chosenfewrecords@hotmail.de">
              {t("nav.startBuild")}
            </a>
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            className="accessible-cyber-button text-white hover:text-cyan-400 hover:bg-slate-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
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
            className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-3xl rounded-[2rem] border border-cyan-500/30 p-8 shadow-2xl lg:hidden overflow-hidden z-50 max-h-[85vh] overflow-y-auto"
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
                    className="cyber-nav-item cyber-focus text-[11px] font-bold text-white hover:text-cyan-400 tracking-[0.25em] uppercase transition-all duration-300 relative group/link"
                  >
                    {item.name}
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="pt-6">
                <Button
                  asChild
                  className="w-full rounded-2xl h-14 bg-purple-600 text-white hover:bg-purple-500 font-bold shadow-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <a
                    href="mailto:chosenfewrecords@hotmail.de"
                    className="flex items-center justify-center gap-2"
                  >
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
