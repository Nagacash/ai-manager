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

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AICreationCarousel from "@/components/AICreationCarousel";
import AudioShowcase from "@/components/AudioShowcase";
import WorkGalleryCarousel from "@/components/WorkGalleryCarousel";
import ServicesCarousel from "@/components/ServicesCarousel";
import RAGSection from "@/components/RAGSection";
import Testimonials from "@/components/Testimonials";
import CookieBanner from "@/components/CookieBanner";
import AINetworkAnimation from "@/components/AINetworkAnimation";
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
      ease: [0.19, 1, 0.22, 1] as const
    }
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
      ease: [0.19, 1, 0.22, 1] as const
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
      ease: [0.19, 1, 0.22, 1] as const
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
      ease: [0.16, 1, 0.3, 1] as const
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

  const highlightsData = (t("highlights.items") || []).map((item: any, index: number) => ({
    ...item,
    icon: highlightIcons[index % highlightIcons.length]
  }));

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
    <div className="min-h-screen cyber-mode text-cyan-400 relative overflow-hidden selection:bg-red-500/50 selection:text-yellow-300 chaos-cursor">
      {/* Skip to Content for Accessibility */}
      <a href="#hero" className="skip-to-content">
        Skip to main content
      </a>
      
      <PerlinNoiseBackground />
      <BackgroundParticles />
      <MatrixRain />
      <CodeParticles />
      <HackerTerminal />
      <ChaosExplosion />
      <DataCorruption />

      {/* CALMED CHAOS BACKGROUND - STILL INSANE THOUGH */}
      <>
        <div className="thermal-melt absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-yellow-900/10 to-blue-900/10 pointer-events-none -z-10" />
        <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_2000px_1500px_at_50%_-200px,#ff000020,#ffff0020,#00ffff20,transparent)] opacity-[0.15] blur-3xl pointer-events-none -z-10" />
        <div className="absolute right-0 top-[10%] size-[1000px] bg-[radial-gradient(circle_at_center,#00ff0030,#ff00ff30,#ffff0030,transparent)] opacity-[0.12] blur-3xl pointer-events-none -z-10" />
        <div className="absolute left-[10%] bottom-[30%] size-[800px] bg-[radial-gradient(circle_at_center,#0000ff30,#ff000030,transparent)] opacity-[0.10] blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#ffffff10,transparent)] opacity-[0.08] blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />
      </>

      <Navbar />

      <main className="relative z-10 isolate mx-auto flex max-w-7xl flex-col gap-40 px-6 pt-32 pb-24 lg:px-12">
        <motion.section
          id="hero"
          className="grid items-center gap-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 pt-12 md:pt-20"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                {t("hero.badge")}
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
                variants={luxuryTextReveal}
                initial="hidden"
                animate="visible"
              >
                <span className="text-white">{t("hero.title1")}</span>{' '}
                <span className="text-purple-400">{t("hero.title2")}</span>{' '}
                <span className="text-white">{t("hero.title3")}</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t("hero.title4")}</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl leading-relaxed text-slate-400 max-w-xl"
                variants={luxuryTextReveal}
                initial="hidden"
                animate="visible"
              >
                {t("hero.description")}
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap gap-4" variants={luxuryFadeItem}>
              <Button 
                asChild 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-8 font-semibold shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5"
              >
                <a href="mailto:chosenfewrecords@hotmail.de" className="flex items-center gap-2">
                  {t("hero.cta1")}
                  <ArrowUpRight className="size-5" />
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full px-8 font-semibold transition-all"
              >
                <a href="https://cyber-sec-six.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  {t("hero.cta2")}
                  <ArrowUpRight className="size-5" />
                </a>
              </Button>
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
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={metallicGlow}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-square w-full overflow-visible rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 group">
              <Image
                src="/images/pic-github.jpg"
                alt="Portrait of Maurice Holda"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top rounded-2xl opacity-95 group-hover:opacity-100 transition-all duration-500"
                priority
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-2xl" />
              
              {/* Accent glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>

             {/* Certification Badge */}
             <div className="hidden md:block absolute -left-4 top-12 z-20">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 1, duration: 0.5 }}
                 whileHover={{ scale: 1.05 }}
               >
                 <div className="size-24 rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-2 flex items-center justify-center shadow-xl">
                   <Image
                     src="/images/badge.png"
                     alt="AI Manager Badge"
                     width={80}
                     height={80}
                     className="object-contain"
                     priority
                   />
                 </div>
               </motion.div>
             </div>

             {/* BALANCED SKILL BADGES - AI, Web, Security */}
             <div className="hidden md:flex absolute -right-6 bottom-16 flex-col gap-3">
               <div className="flex flex-wrap gap-2 max-w-[180px]">
                 {[
                   { label: "AI", icon: "🤖", color: "purple" },
                   { label: "ML", icon: "🧠", color: "violet" },
                   { label: "React", icon: "⚛️", color: "cyan" },
                   { label: "Next.js", icon: "▲", color: "slate" },
                   { label: "Security", icon: "🔐", color: "emerald" },
                   { label: "Cloud", icon: "☁️", color: "sky" },
                 ].map((badge, i) => (
                   <motion.div
                     key={badge.label}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                       delay: 0.8 + i * 0.1,
                       duration: 0.5,
                       ease: "easeOut"
                     }}
                     whileHover={{ scale: 1.1, y: -2 }}
                   >
                    <div className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm
                      ${badge.color === 'purple' ? 'border-purple-400/50 bg-purple-500/20 text-purple-300' : ''}
                      ${badge.color === 'violet' ? 'border-violet-400/50 bg-violet-500/20 text-violet-300' : ''}
                      ${badge.color === 'cyan' ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300' : ''}
                      ${badge.color === 'slate' ? 'border-slate-400/50 bg-slate-500/20 text-slate-300' : ''}
                      ${badge.color === 'emerald' ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300' : ''}
                      ${badge.color === 'sky' ? 'border-sky-400/50 bg-sky-500/20 text-sky-300' : ''}
                    `}>
                      <span className="mr-1">{badge.icon}</span>
                      {badge.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
              {t("services.title1")} <span className="text-purple-400">{t("services.title2")}</span> {t("services.title3")} <span className="text-purple-400">{t("services.title4")}</span>
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

        {/* --- AI CREATIVE SHOWCASE --- */}
        <motion.section
          className="scroll-mt-32 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium">
              {t("services.aiCreationBadge") || "AI Image Artistry"}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white">
              {t("services.aiCreationTitle") || "Showcase: AI Image Creation"}
            </h3>
            <p className="text-lg text-slate-400">
              {t("services.aiCreationDescription") || "Discover how we leverage state-of-the-art AI models to create bespoke, production-ready brand assets."}
            </p>
          </div>
          <AICreationCarousel />
        </motion.section>

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
                {t("work.title1")} <span className="text-purple-400">{t("work.title2")}</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="mt-12"
            variants={luxuryFadeItem}
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
                {t("highlights.title1")} <span className="text-purple-400">{t("highlights.title2")}</span>
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
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">{t("about.title")}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                      {t("about.subtitle")} <span className="text-purple-400">{t("about.subtitleI")}</span>
                    </h2>
                  </div>
                  <p className="text-xl text-slate-400 leading-relaxed font-medium">
                    {t("about.bio")}
                  </p>
                  <div className="pt-4">
                    <Button asChild className="rounded-full gap-2 bg-purple-600 hover:bg-purple-500 text-white">
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
                          <p className="text-sm text-slate-400 font-medium">{item.detail}</p>
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
                style={{ pointerEvents: 'none' }}
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
              <Button className="rounded-full px-10 h-14 text-base font-bold shadow-2xl hover:scale-105 transition-all border-slate-700 text-white hover:bg-slate-800" variant="outline">
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
                <Button asChild size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-background text-foreground hover:bg-background/90 shadow-2xl transition-all hover:-translate-y-1">
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
                  <p className="text-4xl font-bold text-background">{t("contact.reply")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-background border-t border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-8 max-w-sm">
              <Image src="/images/logo.png" alt="Logo" width={140} height={40} className="dark:invert opacity-80" />
              <p className="text-muted-foreground font-medium leading-relaxed">
                Human-centered strategist delivering AI coproductions and secure digital surfaces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple">Navigation</h4>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-bold text-foreground/60 hover:text-brand-purple transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple">Social</h4>
                <ul className="space-y-4">
                  <li><a href="https://linkedin.com/in/maurice-holda" className="text-sm font-bold text-foreground/60 hover:text-brand-purple transition-colors">LinkedIn</a></li>
                  <li><a href="https://instagram.com/naga_apparel/" className="text-sm font-bold text-foreground/60 hover:text-brand-purple transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-20 mt-20 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold text-muted-foreground/40 tracking-widest uppercase">
              © 2026 Naga Codex · Designed by Maurice Holda
            </p>

            <div className="flex items-center gap-8">
              <div className="flex gap-8">
                <Link href="/policies" className="text-xs font-bold text-muted-foreground/40 hover:text-foreground transition-colors uppercase tracking-widest">Privacy</Link>
                <Link href="/policies" className="text-xs font-bold text-muted-foreground/40 hover:text-foreground transition-colors uppercase tracking-widest">Legal</Link>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full size-10 border-border/40 hover:bg-foreground hover:text-background transition-all"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
