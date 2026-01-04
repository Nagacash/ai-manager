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
import CookieBanner from "@/components/CookieBanner";
import { useLanguage } from "@/lib/LanguageContext";


const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const
    }
  },
};

const textReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const
    },
  },
};

const titleReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const
    },
  },
};

const sectionShell =
  "scroll-mt-32 rounded-[2.5rem] border border-white/40 bg-white/60 p-8 sm:p-12 shadow-xl backdrop-blur-xl";

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
    <div className="min-h-screen bg-gradient-hero text-foreground relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      <PerlinNoiseBackground />
      <BackgroundParticles />

      {/* Ambient Background Glows */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_1000px_800px_at_50%_-200px,var(--brand-purple),transparent)] opacity-[0.03] blur-3xl pointer-events-none -z-10" />
      <div className="absolute right-0 top-[20%] size-[600px] bg-[radial-gradient(circle_at_center,var(--brand-purple),transparent)] opacity-[0.05] blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="relative z-10 isolate mx-auto flex max-w-7xl flex-col gap-40 px-6 pt-32 pb-24 lg:px-12">
        <motion.section
          id="hero"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 pt-12 md:pt-20"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="space-y-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeItem}>
              <Badge variant="glass" className="bg-[var(--brand-purple)]/10 text-[var(--brand-purple)] border-[var(--brand-purple)]/20 px-3 py-1">
                {t("hero.badge")}
              </Badge>
            </motion.div>

            <div className="space-y-8">
              <motion.h1
                className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-smooth leading-[1.1]"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              >
                {t("hero.title1")} <span className="text-accent italic font-serif">{t("hero.title2")}</span> {t("hero.title3")} <span className="text-accent italic font-serif">{t("hero.title4")}</span>
              </motion.h1>
              <motion.p
                className="text-xl leading-relaxed text-muted-foreground max-w-2xl"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              >
                {t("hero.description")}
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap gap-5" variants={fadeItem}>
              <Button asChild size="lg" className="rounded-full px-10 text-base shadow-2xl shadow-brand-purple/20 hover:shadow-brand-purple/30 hover:-translate-y-1 transition-all duration-300">
                <a
                  href="mailto:chosenfewrecords@hotmail.de"
                  className="inline-flex items-center gap-2"
                >
                  {t("hero.contact")}
                  <ArrowUpRight className="size-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 text-base border-border hover:bg-muted/50 hover:border-brand-purple hover:text-brand-purple hover:-translate-y-1 transition-all duration-300">
                <a
                  href="https://cyber-sec-six.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Portfolio
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {t("hero.stats").map((stat: any) => (
                <motion.div
                  key={stat.label}
                  className="space-y-1"
                  variants={fadeItem}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" as const }}
            className="relative mx-auto w-full max-w-md lg:max-w-full"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white/50">
              <Image
                src="/images/pic-github.jpg"
                alt="Portrait of Maurice Holda"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-sm font-medium uppercase tracking-widest text-white/80 mb-2">
                  Maurice Holda
                </p>
                <h3 className="text-3xl font-bold mb-2">
                  AI & Cyber Security Graduate
                </h3>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  Human-centered strategist delivering AI copilots and secure web surfaces.
                </p>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -left-6 -top-6 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="size-24 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/50 p-2 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/badge.png"
                    alt="AI Manager Badge"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Floating Right Badges */}
            <div className="absolute -right-4 top-12 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Certified AI Manager",
                  "Full-Stack Web Developer",
                  "CompTIA Security+",
                  "CCNA (in progress)",
                  "MCP Automation Systems",
                ].map((badge, i) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Badge
                      variant="glass"
                      className="bg-primary/5 text-primary border-primary/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {badge}
                    </Badge>
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
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <Badge variant="glass" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 uppercase tracking-widest text-xs font-bold">
              {t("services.badge")}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              {t("services.title1")} <span className="text-primary italic font-serif">{t("services.title2")}</span> {t("services.title3")} <span className="text-primary italic font-serif">{t("services.title4")}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
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
            <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-tighter py-1 font-bold">
              {t("services.aiCreationBadge") || "AI Image Artistry"}
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground">
              {t("services.aiCreationTitle") || "Showcase: AI Image Creation"}
            </h3>
            <p className="text-lg text-muted-foreground">
              {t("services.aiCreationDescription") || "Discover how we leverage state-of-the-art AI models to create bespoke, production-ready brand assets."}
            </p>
          </div>
          <AICreationCarousel />
        </motion.section>

        {/* --- AUDIO SHOWCASE SECTION --- */}
        <motion.section
          id="audio"
          className="scroll-mt-32 pt-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AudioShowcase />
        </motion.section>

        <motion.section
          id="work"
          className={`${sectionShell} space-y-12`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-8 px-6">
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 text-brand-purple"
                variants={fadeItem}
              >
                <div className="h-px w-10 bg-current opacity-30" />
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {t("work.badge")}
                </span>
                <div className="h-px w-10 bg-current opacity-30" />
              </motion.div>
              <motion.h2
                className="text-5xl font-bold text-foreground sm:text-7xl tracking-tighter leading-[1.05]"
                variants={titleReveal}
              >
                {t("work.title1")} <span className="text-brand-purple italic font-serif">{t("work.title2")}</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="mt-12"
            variants={fadeItem}
          >
            <WorkGalleryCarousel />
          </motion.div>
        </motion.section>

        <motion.section
          id="highlights"
          className="scroll-mt-32 pt-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="space-y-12">
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-3 text-brand-purple bg-brand-purple/5 px-5 py-2 rounded-full border border-brand-purple/10"
                variants={fadeItem}
              >
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {t("highlights.badge")}
                </span>
              </motion.div>
              <motion.h2
                className="text-5xl font-bold text-foreground sm:text-7xl tracking-tighter leading-[1.05]"
                variants={titleReveal}
              >
                {t("highlights.title1")} <span className="text-brand-purple italic font-serif">{t("highlights.title2")}</span>
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
                  className="glass-panel p-8 rounded-[2rem] border-primary/5 hover:border-brand-purple hover:shadow-[0_0_30px_-5px_rgba(var(--brand-purple),0.4)] hover:bg-brand-purple/5 transition-all duration-300 group"
                >
                  <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="size-6 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="text-primary/70 text-[10px] font-bold uppercase tracking-widest mb-4">
                    {item.subtitle}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          className="scroll-mt-32 pt-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="glass-panel rounded-[3rem] overflow-hidden border-border/40 shadow-2xl bg-card/40 backdrop-blur-2xl">
            <div className="grid lg:grid-cols-[1fr_1.2fr] items-stretch min-h-[500px]">
              {/* Left Column: Content Area */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 relative z-10">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-purple">{t("about.title")}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
                      {t("about.subtitle")} <span className="text-brand-purple italic font-serif">{t("about.subtitleI")}</span>
                    </h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    {t("about.bio")}
                  </p>
                  <div className="pt-4">
                    <Button asChild className="rounded-full gap-2">
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
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple flex items-center gap-3">
                      <GraduationCap className="size-4" />
                      {t("about.education.title")}
                    </h3>
                    <div className="space-y-8">
                      {aboutData.education.map((item: any) => (
                        <div key={item.title} className="space-y-2">
                          <h4 className="text-lg font-bold text-foreground">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground font-medium">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple flex items-center gap-3">
                        <Languages className="size-4" />
                        {t("about.languages.title")}
                      </h3>
                      <div className="grid gap-4">
                        {aboutData.languages.map((langItem: any) => (
                          <div
                            key={langItem.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground font-bold">
                              {langItem.name}
                            </span>
                            <span className="text-muted-foreground font-medium italic">
                              {langItem.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple flex items-center gap-3">
                        <BrainCircuit className="size-4" />
                        {t("about.skills.title")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {aboutData.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/5 text-[11px] font-bold text-foreground/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 text-center pt-8 border-t border-border/40">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple flex items-center justify-center gap-3">
                      <ShieldCheck className="size-4" />
                      {t("about.certifications.title")}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {aboutData.certifications.map((item: string) => (
                        <div
                          key={item}
                          className="text-xs font-bold text-muted-foreground flex items-center gap-2 "
                        >
                          <div className="size-1.5 rounded-full bg-brand-purple" />
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
          variants={sectionVariants}
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
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-12">
            <motion.div variants={fadeItem} className="space-y-8">
              <Badge variant="glass" className="bg-brand-purple/10 text-brand-purple border-brand-purple/20 px-4 py-1.5 uppercase tracking-widest text-xs font-bold">
                {t("codex.badge")}
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.05] tracking-tighter">
                {t("codex.title")}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {t("codex.description")}
              </p>
              <Button className="rounded-full px-10 h-14 text-base font-bold shadow-2xl hover:scale-105 transition-all" variant="outline">
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
                className="glass-panel p-10 rounded-[3rem] border-border/40 hover:border-brand-purple hover:shadow-[0_0_40px_-5px_rgba(var(--brand-purple),0.4)] hover:bg-brand-purple/5 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-purple/50 group-hover:text-brand-purple transition-colors">
                    {principle.label}
                  </p>
                  <Badge className="bg-foreground text-background font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border-none">
                    Naga Codex
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--brand-purple),transparent_70%)] opacity-20" />
          <div className="relative grid gap-20 px-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-20 lg:p-24">
            <div className="space-y-12">
              <motion.div variants={fadeItem} className="space-y-8">
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
      </main >

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
