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
import ChatBot from "@/components/ChatBot";
import StarParticles from "@/components/StarParticles";
import SmokeParticles from "@/components/SmokeParticles";
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
import AnimatedHeader from "@/components/AnimatedHeader";
import SectionDivider from "@/components/SectionDivider";
import { useLanguage } from "@/lib/LanguageContext";

// Animated text component for hero
function AnimatedText({ text }: { text: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className="inline-flex flex-wrap"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.25em] will-change-transform"
        >
          <span
            className={
              index === 1 || index === 3
                ? "bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent"
                : "text-white"
            }
          >
            {word}
          </span>
        </motion.span>
      ))}
    </motion.span>
  );
}

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
      <StarParticles />
      <SmokeParticles />
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
              <FloatingBadge
                icon={<Sparkles className="size-3" />}
                variant="purple"
              >
                {t("hero.badge")}
              </FloatingBadge>
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-glow-strong">
                <AnimatedText
                  text={`${t("hero.title1")} ${t("hero.title2")} ${t("hero.title3")} ${t("hero.title4")}`}
                />
              </h1>
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
                onClick={() =>
                  (window.location.href = "mailto:chosenfewrecords@hotmail.de")
                }
              >
                {t("hero.cta1")}
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="size-5" />}
                onClick={() =>
                  window.open("https://cyber-sec-six.vercel.app/", "_blank")
                }
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
                {["AI/ML", "React", "Next.js", "Security", "Cloud", "LLMs"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-700/40">
                <div className="size-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">
                  Available for projects
                </span>
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
          <div className="bg-slate-950/50 rounded-3xl p-8 md:p-12 border border-white/5">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                {t("terminal.badge") || "Live System"}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {t("terminal.title") || "System"}{" "}
                <span className="text-purple-400">
                  {t("terminal.titleAccent") || "Terminal"}
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                {t("terminal.description") ||
                  "A live look into the neural network — autonomous agents, quantum encryption, and code intelligence running in real time."}
              </p>
            </div>

            {/* Modern Floating Terminal */}
            <div className="relative mx-auto max-w-4xl">
              {/* Glowing backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-purple-400/10 to-purple-500/20 rounded-3xl blur-2xl" />

              {/* Terminal Window */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Minimal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      naga@codex: ~/neural-ops
                    </span>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Terminal Content */}
                <div className="relative w-full h-[380px] md:h-[480px]">
                  {/* Background effects */}
                  <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain />
                    <CodeParticles />
                    <ChaosExplosion />
                  </div>

                  {/* Terminal content */}
                  <div className="absolute inset-0 overflow-hidden">
                    <HackerTerminal />
                  </div>

                  {/* Subtle overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/20" />
                </div>
              </div>

              {/* Floating decoration elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-2xl blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-purple-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </motion.section>

        <SectionDivider />

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
            <AnimatedHeader
              as="h2"
              className="text-3xl md:text-6xl font-bold text-white tracking-tight"
            >
              {t("services.title1")}{" "}
              <span className="text-purple-400">{t("services.title2")}</span>{" "}
              {t("services.title3")}{" "}
              <span className="text-purple-400">{t("services.title4")}</span>
            </AnimatedHeader>
            <p className="text-xl text-slate-400 leading-relaxed">
              {t("services.description")}
            </p>
          </div>

          <ServicesCarousel />
        </motion.section>

        <SectionDivider />

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
          <AudioShowcase autoPlay />
        </motion.section>

        <SectionDivider />

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
              <AnimatedHeader
                as="h2"
                className="text-5xl font-bold text-white sm:text-7xl tracking-tighter leading-[1.05]"
              >
                {t("work.title1")}{" "}
                <span className="text-purple-400">{t("work.title2")}</span>
              </AnimatedHeader>
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

        <SectionDivider />

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
              <AnimatedHeader
                as="h2"
                className="text-5xl font-bold text-white sm:text-7xl tracking-tighter leading-[1.05]"
              >
                {t("highlights.title1")}{" "}
                <span className="text-purple-400">
                  {t("highlights.title2")}
                </span>
              </AnimatedHeader>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {highlightsData.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group"
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

        <SectionDivider />

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
                <AnimatedHeader
                  as="h2"
                  className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]"
                >
                  {t("contact.title")}
                </AnimatedHeader>
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
