"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  LineChart,
  ShieldCheck,
  Code,
  Cpu,
  Globe,
  Palette,
  GraduationCap,
  Languages,
  BookOpen,
  Mail,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import PerlinNoiseBackground from "@/components/PerlinNoiseBackground";
import BackgroundParticles from "@/components/BackgroundParticles";
import AIActSection from "@/components/AIActSection";
import Navbar from "@/components/Navbar";
import MatrixRain from "@/components/MatrixRain";
import CodeParticles from "@/components/CodeParticles";
import HackerTerminal from "@/components/HackerTerminal";
import ChaosExplosion from "@/components/ChaosExplosion";
import DataCorruption from "@/components/DataCorruption";
import ScanlinesOverlay from "@/components/ScanlinesOverlay";
import CosmicStarfield from "@/components/CosmicStarfield";
import OrbitalRings from "@/components/OrbitalRings";
import PremiumButton from "@/components/PremiumButton";
import FloatingBadge from "@/components/FloatingBadge";
import GlassCard from "@/components/GlassCard";
import PremiumFooter from "@/components/PremiumFooter";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AudioShowcase from "@/components/AudioShowcase";
import WorkGalleryCarousel from "@/components/WorkGalleryCarousel";
import ServicesCarousel from "@/components/ServicesCarousel";
import RAGSection from "@/components/RAGSection";
import Testimonials from "@/components/Testimonials";
import CookieBanner from "@/components/CookieBanner";
import AINetworkAnimation from "@/components/AINetworkAnimation";
import AILabAnimation from "@/components/AILabAnimation";
import { useLanguage } from "@/lib/LanguageContext";

const luxurySectionVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const luxuryStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const luxuryFadeItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const luxuryTextReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const luxuryWordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const luxuryTitleReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const brutalReveal = {
  hidden: { opacity: 0, x: -100, skewX: -10 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const metallicGlow = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.19, 1, 0.22, 1] as const,
      delay: 0.5,
    },
  },
};

const sectionShell =
  "scroll-mt-32 rounded-[3rem] glass-panel p-10 sm:p-16 shadow-2xl noise-texture metallic-sheen";

export default function App() {
  const { t, lang } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Data for "About" section
  const principlesData = t("principles") || [];

  const highlightIcons = [BrainCircuit, Cpu, Code, Palette];

  const highlightsData = (t("highlights.items") || []).map(
    (item: any, index: number) => ({
      ...item,
      icon: highlightIcons[index % highlightIcons.length],
    }),
  );

  const aboutData = {
    education: t("about.education.items") || [],
    languages: t("about.languages.items") || [],
    certifications: t("about.certifications.items") || [],
    skills: t("about.skills.items") || [],
    publications: t("about.publications.items") || [],
  };

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore errors if audio can't play (user interaction required)
      });
    } else {
      const audio = new Audio("/images/sound/mouse.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore errors if audio can't play
      });
      audioRef.current = audio;
    }
  };

  return (
    <div className="min-h-screen cyber-mode text-white relative overflow-hidden selection:bg-purple-500/50 selection:text-white chaos-cursor">
      {/* Skip to Content for Accessibility */}
      <a href="#hero" className="skip-to-content">
        Skip to main content
      </a>

      {/* COSMIC BACKGROUND LAYERS - From Another Planet */}
      <CosmicStarfield />
      <OrbitalRings />
      <PerlinNoiseBackground />
      <BackgroundParticles />
      <DataCorruption />
      <ScanlinesOverlay />

      {/* CALMED CHAOS BACKGROUND - STILL INSANE THOUGH */}
      <>
        <div className="thermal-melt absolute inset-0" />
        {/* COHESIVE COSMIC GRADIENTS - Cyan/Purple/Pink System */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-purple-950/10 to-purple-950/5 pointer-events-none -z-10" />
        <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_2000px_1500px_at_50%_-200px,rgba(168,85,247,0.15),rgba(168,85,247,0.1),rgba(168,85,247,0.05),transparent)] opacity-100 blur-3xl pointer-events-none -z-10" />
        <div className="absolute right-0 top-[10%] size-[1000px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),rgba(168,85,247,0.08),transparent)] blur-3xl pointer-events-none -z-10" />
        <div className="absolute left-[10%] bottom-[30%] size-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),rgba(168,85,247,0.08),transparent)] blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent)] blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />
      </>

      <Navbar />

      <main className="relative z-10 isolate mx-auto flex max-w-7xl flex-col gap-40 px-6 pt-32 pb-24 lg:px-12">
        <motion.section
          id="hero"
          className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 pt-12 md:pt-20"
          variants={luxurySectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="space-y-10"
            variants={luxuryStaggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={luxuryFadeItem}>
              <FloatingBadge icon={<Sparkles className="size-3" />} variant="purple">
                {t("hero.badge")}
              </FloatingBadge>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-glow-strong"
                variants={luxuryTextReveal}
                initial="hidden"
                animate="visible"
              >
                <span className="text-white">{t("hero.title1")}</span>{" "}
                <span className="gradient-text-animated">{t("hero.title2")}</span>{" "}
                <span className="text-white">{t("hero.title3")}</span>{" "}
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                  {t("hero.title4")}
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-xl text-glow"
                variants={luxuryTextReveal}
                initial="hidden"
                animate="visible"
              >
                {t("hero.description")}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={luxuryFadeItem}
            >
              <PremiumButton
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="size-5" />}
                onClick={() => window.location.href = "mailto:chosenfewrecords@hotmail.de"}
              >
                {t("hero.cta1")}
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="size-5" />}
                onClick={() => window.open("https://cyber-sec-six.vercel.app/", "_blank")}
              >
                {t("hero.cta2")}
              </PremiumButton>
            </motion.div>

            <motion.div
              className="grid gap-6 border-t border-slate-800 pt-10 sm:grid-cols-3"
              variants={luxuryStaggerContainer}
              initial="hidden"
              animate="visible"
            >
              {t("hero.stats").map((stat: any, index: number) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={luxuryFadeItem}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1 text-glow">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={metallicGlow}
            className="relative mx-auto w-full max-w-sm md:max-w-md lg:max-w-none flex flex-col items-center gap-6"
          >
            {/* Image frame */}
            <div className="relative w-full group">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl">
                <Image
                  src="/images/pic-github.jpg"
                  alt="Portrait of Maurice Holda"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  priority
                />
                {/* Subtle bottom fade only */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Badge — floated top-right over image */}
              <motion.div
                className="absolute -bottom-4 -right-4 z-20"
                initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              >
                <div className="size-20 md:size-24 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-purple-500/30 p-2 flex items-center justify-center shadow-xl shadow-purple-500/10">
                  <Image
                    src="/images/badge.png"
                    alt="AI Manager Badge"
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Info card below image */}
            <motion.div
              className="w-full rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5 md:p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Maurice Holda
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  AI Manager · Full-Stack Developer · Cybersecurity
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["AI/ML", "React", "Next.js", "Security", "Cloud", "LLMs"].map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-700/40">
                <div className="size-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">Available for projects</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* --- CYBER TERMINAL SHOWCASE --- */}
        <motion.section
          id="terminal"
          className="scroll-mt-32"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {t("terminal.badge") || "Live System"}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {t("terminal.title") || "System"}{" "}
              <span className="text-purple-400">{t("terminal.titleAccent") || "Terminal"}</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t("terminal.description") || "A live look into the neural network — autonomous agents, quantum encryption, and code intelligence running in real time."}
            </p>
          </div>

          {/* Monitor Frame */}
          <div className="mx-auto max-w-5xl">
            {/* Monitor Body */}
            <div className="relative rounded-2xl border-[3px] border-slate-600 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-700 p-2 md:p-3 shadow-[0_8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Top bezel with webcam + indicator */}
              <div className="flex items-center justify-center gap-2 pb-2">
                <div className="size-2 rounded-full bg-slate-600 ring-1 ring-slate-500" />
                <div className="size-3 rounded-full bg-slate-900 ring-1 ring-slate-600 flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="size-2 rounded-full bg-slate-600 ring-1 ring-slate-500" />
              </div>

              {/* Screen */}
              <div className="relative w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-[#0d1117] border border-slate-900 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
                {/* Window title bar */}
                <div className="relative z-30 flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                  <div className="flex gap-2">
                    <div className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
                    <div className="size-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                    <div className="size-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <svg className="size-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[11px] font-mono text-slate-500">naga@codex: ~/neural-ops</span>
                  </div>
                  <div className="w-[52px] flex justify-end gap-2">
                    <svg className="size-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                    <svg className="size-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>

                {/* Background effects layer (behind terminal text) */}
                <div className="absolute inset-0 top-[36px] overflow-hidden z-0">
                  <MatrixRain />
                  <CodeParticles />
                  <ChaosExplosion />
                </div>

                {/* Terminal content (on top of effects) */}
                <div className="absolute inset-0 top-[36px] overflow-hidden">
                  <HackerTerminal />
                </div>

                {/* CRT scanline overlay */}
                <div className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay opacity-[0.025] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.06)_1px,rgba(255,255,255,0.06)_2px)]" />
                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
                {/* Screen reflection glare */}
                <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent" />
              </div>

              {/* Bottom bezel with brand */}
              <div className="flex items-center justify-center pt-2">
                <div className="px-4 py-0.5 rounded-sm">
                  <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">Naga Codex</span>
                </div>
              </div>
            </div>

            {/* Monitor Stand - Neck */}
            <div className="flex justify-center">
              <div className="w-16 h-10 bg-gradient-to-b from-slate-700 to-slate-600 border-x border-slate-500/30 shadow-lg" />
            </div>

            {/* Monitor Stand - Base */}
            <div className="flex justify-center -mt-px">
              <div className="w-48 h-3 rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-700 border border-t-0 border-slate-500/30 shadow-xl" />
            </div>

            {/* Desk reflection */}
            <div className="flex justify-center mt-1">
              <div className="w-40 h-4 bg-gradient-to-b from-slate-800/30 to-transparent rounded-full blur-md" />
            </div>
          </div>
        </motion.section>

        {/* --- SERVICES SECTION --- */}
        <motion.section
          id="services"
          className="scroll-mt-32 space-y-12"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
              {t("services.badge")}
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
              {t("services.title1")}{" "}
              <span className="text-purple-400">{t("services.title2")}</span>{" "}
              {t("services.title3")}{" "}
              <span className="text-purple-400">{t("services.title4")}</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              {t("services.description")}
            </p>
          </div>

          <ServicesCarousel />
        </motion.section>

        {/* --- CAPABILITIES & AUTOMATION --- */}
        <div className="space-y-24">
          <AIActSection />
          <RAGSection />
        </div>

        {/* --- AUDIO SHOWCASE SECTION --- */}
        <motion.section
          id="audio"
          className="scroll-mt-32 pt-12"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AudioShowcase />
        </motion.section>

        <motion.section
          id="work"
          className={`${sectionShell} space-y-12`}
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-8 px-6">
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 text-purple-400"
                variants={luxuryFadeItem}
              >
                <div className="h-px w-10 bg-current opacity-30" />
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {t("work.badge")}
                </span>
                <div className="h-px w-10 bg-current opacity-30" />
              </motion.div>
              <motion.h2
                className="text-5xl font-bold text-white sm:text-7xl tracking-tighter leading-[1.05]"
                variants={luxuryTextReveal}
              >
                {t("work.title1")}{" "}
                <span className="text-purple-400">{t("work.title2")}</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
          >
            <AILabAnimation />
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <WorkGalleryCarousel />
          </motion.div>
        </motion.section>

        <motion.section
          id="highlights"
          className="scroll-mt-32 pt-24"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="space-y-12">
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-3 text-purple-400 bg-purple-500/10 px-5 py-2 rounded-full border border-purple-500/20"
                variants={luxuryFadeItem}
              >
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {t("highlights.badge")}
                </span>
              </motion.div>
              <motion.h2
                className="text-5xl font-bold text-white sm:text-7xl tracking-tighter leading-[1.05]"
                variants={luxuryTextReveal}
              >
                {t("highlights.title1")}{" "}
                <span className="text-purple-400">
                  {t("highlights.title2")}
                </span>
              </motion.h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {highlightsData.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
                >
                  <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                    <item.icon className="size-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="text-purple-400/70 text-[10px] font-bold uppercase tracking-widest mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <Testimonials />

        <motion.section
          id="about"
          className="scroll-mt-32 pt-24"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="grid lg:grid-cols-[1fr_1.2fr] items-stretch min-h-[500px]">
              {/* Left Column: Content Area */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 relative z-10">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                      {t("about.title")}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                      {t("about.subtitle")}{" "}
                      <span className="text-purple-400">
                        {t("about.subtitleI")}
                      </span>
                    </h2>
                  </div>
                  <p className="text-xl text-slate-400 leading-relaxed font-medium">
                    {t("about.bio")}
                  </p>
                  <div className="pt-4">
                    <Button
                      asChild
                      className="rounded-full gap-2 bg-purple-600 hover:bg-purple-500 text-white"
                    >
                      <Link href="/contact">
                        {t("about.contact")}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Experience & Skills */}
              <div className="p-10 md:p-14 lg:p-16 space-y-16">
                {/* Education */}
                <div className="space-y-16">
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 flex items-center gap-3">
                      <GraduationCap className="size-4" />
                      {t("about.education.title")}
                    </h3>
                    <div className="space-y-8">
                      {aboutData.education.map((item: any) => (
                        <div key={item.title} className="space-y-2">
                          <h4 className="text-lg font-bold text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-400 font-medium">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 flex items-center gap-3">
                        <Languages className="size-4" />
                        {t("about.languages.title")}
                      </h3>
                      <div className="grid gap-4">
                        {aboutData.languages.map((langItem: any) => (
                          <div
                            key={langItem.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-white font-bold">
                              {langItem.name}
                            </span>
                            <span className="text-slate-400 font-medium italic">
                              {langItem.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 flex items-center gap-3">
                        <BrainCircuit className="size-4" />
                        {t("about.skills.title")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {aboutData.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 text-center pt-8 border-t border-slate-800">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 flex items-center justify-center gap-3">
                      <ShieldCheck className="size-4" />
                      {t("about.certifications.title")}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {aboutData.certifications.map((item: string) => (
                        <div
                          key={item}
                          className="text-xs font-bold text-slate-400 flex items-center gap-2"
                        >
                          <div className="size-1.5 rounded-full bg-purple-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Video Background Section */}
        <motion.section
          className="relative scroll-mt-32 overflow-hidden rounded-[2.5rem] border border-border/40 shadow-2xl bg-card/50"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/4udj0bH9Ouo?si=9SKmxRS8kObU5_W8&autoplay=1&mute=1&loop=1&playlist=4udj0bH9Ouo&controls=0&showinfo=0&rel=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full scale-[1.02]"
                style={{ pointerEvents: "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/10 z-10" />
            </div>
          </div>
        </motion.section>

        <motion.section
          id="codex"
          className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr] items-start"
          variants={luxurySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-12">
            <motion.div variants={luxuryFadeItem} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
                {t("codex.badge")}
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tighter">
                {t("codex.title")}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                {t("codex.description")}
              </p>
              <Button
                className="rounded-full px-10 h-14 text-base font-bold shadow-2xl hover:scale-105 transition-all border-slate-700 text-white hover:bg-slate-800"
                variant="outline"
              >
                {t("codex.download")}
                <ArrowUpRight className="size-5 ml-2" />
              </Button>
            </motion.div>
          </div>

          <div className="space-y-8">
            {principlesData.map((principle: any, idx: number) => (
              <motion.div
                key={principle.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm p-10 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400/50 group-hover:text-purple-400 transition-colors">
                    {principle.label}
                  </p>
                  <span className="bg-white text-slate-900 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                    Naga Codex
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">
                    {principle.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="relative overflow-hidden rounded-[4rem] bg-foreground text-background shadow-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--brand-purple),transparent_70%)] opacity-20" />
          <div className="relative grid gap-20 px-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-20 lg:p-24">
            <div className="space-y-12">
              <motion.div variants={luxuryFadeItem} className="space-y-8">
                <Badge className="bg-background/10 text-background border-background/20 px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                  {t("contact.badge")}
                </Badge>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
                  {t("contact.title")}
                </h2>
                <p className="text-xl text-background/70 leading-relaxed font-medium max-w-xl">
                  {t("contact.description")}
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-6 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-12 h-16 text-lg font-bold bg-background text-foreground hover:bg-background/90 shadow-2xl transition-all hover:-translate-y-1"
                >
                  <Link href="/contact">
                    {t("contact.open")}
                    <ArrowUpRight className="size-6 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="text-background/60 hover:text-background hover:bg-background/10 h-16 font-bold px-8 rounded-full"
                >
                  <a href="mailto:chosenfewrecords@hotmail.de">
                    {t("email") || "Email Us"}
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="glass-panel p-10 rounded-[3rem] bg-background/5 border-background/10 space-y-8">
                <div className="space-y-4">
                  <p className="text-lg font-bold text-background/90">
                    {t("contact.instruction")}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-brand-purple animate-pulse" />
                    <p className="text-xs uppercase tracking-[0.3em] text-background/40 font-bold">
                      {t("contact.responseTime")}
                    </p>
                  </div>
                </div>
                <div className="pt-8 border-t border-background/10">
                  <p className="text-4xl font-bold text-background">
                    {t("contact.reply")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <PremiumFooter navLinks={navLinks} />

      <CookieBanner />
    </div>
  );
}
