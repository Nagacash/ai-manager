"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import PerlinNoiseBackground from "@/components/PerlinNoiseBackground";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Intelligent Video Content",
    description:
      "Generate branded video styles, motion boards, and cinematic scenes on demand so complex storytelling stays fast, consistent, and on brief.",
    icon: BrainCircuit,
    image: "/images/nagaweb3.png",
  },
  {
    title: "AI Automation Systems",
    description:
      "Ship automation assemblies with human approvals, telemetry, and compliance dashboards so every workflow scales safely and transparently.",
    icon: ShieldCheck,
    image: "/images/nagaweb2.png",
  },
  {
    title: "AI Image Creation",
    description:
      "Create AI image systems for product mockups, campaigns, and bespoke art that mirror your brand, stay production ready, and scale across teams.",
    icon: LineChart,
    image: "/images/nagaweb1.png",
  },
];

const work = [
  {
    company: "Helix BioCloud",
    outcome: "42% faster regulatory reviews",
    detail:
      "Multi-agent reviewer that cross-checks lab results against CFR Part 11, surfacing issues in real time.",
  },
  {
    company: "Nova Commodities",
    outcome: "$3.1M captured arbitrage",
    detail:
      "Autonomous trading intelligence that reconciles 19 data feeds, identifies anomalies, and alerts traders.",
  },
  {
    company: "Sable Support",
    outcome: "-63% ticket resolution time",
    detail:
      "Conversational triage layer with retrieval-augmented reasoning and guided workflows for agents.",
  },
];

const principles = [
  {
    label: "01 / Strategy",
    title: "Systems thinking first",
    copy: "We map your value chain, identify the highest-leverage moments, and only then design the AI surface.",
  },
  {
    label: "02 / Safety",
    title: "Guardrails baked in",
    copy: "Human review loops, telemetry, and policy enforcement ensure every automation is auditable and trusted.",
  },
  {
    label: "03 / Momentum",
    title: "Ship in 30-day arcs",
    copy: "Each sprint lands a measurable outcome, so you see ROI while we progressively scale the capability.",
  },
];

const highlights = [
  {
    title: "Miracle Logistics",
    subtitle: "Custom Web Design",
    description:
      "Led the AI roadmap for a Hamburg operator, defining governance, success metrics, and UX for an intelligent logistics control room.",
  },
  {
    title: "Automation Stack",
    subtitle: "AI Integration + MCP",
    description:
      "Directed multi-agent automation with MCP servers, aligning stakeholders on data contracts, oversight rituals, and KPI telemetry.",
  },
  {
    title: "Personal Portfolio",
    subtitle: "Showcase & Experimentation",
    description:
      "Documented AI-manager playbooks at cyber-sec-six.vercel.app, blending product briefs, governance templates, and live prototypes.",
  },
  {
    title: "AI Creative Solutions",
    subtitle: "Image & Video Generation",
    description:
      "Built scalable AI image and video generation systems for product mockups, marketing campaigns, and bespoke digital art solutions.",
  },
];

const education = [
  {
    title: "Masterschool Cybersecurity Certificate",
    detail:
      "Full-stack security curriculum focused on threat modeling, monitoring, and secure-by-design thinking.",
  },
  {
    title: "Web Development – DCI Berlin",
    detail:
      "Front-end specialization across HTML, React, and Next.js with emphasis on dynamic, user-centric design.",
  },
  {
    title: "Audio Engineering – Mastering Academy (Top 5%)",
    detail:
      "Mastered high-fidelity sound design, showcasing disciplined workflows now applied to systems engineering.",
  },
];

const languages = [
  { name: "Deutsch", level: "Professional Working" },
  { name: "English", level: "Professional Working" },
  { name: "Creole", level: "Elementary" },
];

const certifications = [
  "CompTIA Security+",
  "CCNA (in progress)",
  "AI for Everyone",
  "AI for Networking",
  "Google Cybersecurity Certificate",
  "Audio Engineer Certification",
  "Tata Group – Cybersecurity Analyst Simulation",
];

const skills = [
  "AI Management",
  "KI Prompting",
  "Multimodal Prompting",
  "Ops Playbooks",
];

const publications = [
  "#wearenbundesliga trailer recording",
  "NAGA APPAREL creative direction",
];

const heroStats = [
  { label: "Certified", value: "AI Manager · Security+" },
  { label: "Focus", value: "AI Strategy & Ops" },
  { label: "Base", value: "Hamburg, Germany" },
];

const heroBadges = [
  "Certified AI Manager",
  "CompTIA Security+",
  "CCNA (in progress)",
  "MCP Automation Systems",
];

const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Highlights", href: "#highlights" },
  { label: "Codex", href: "#codex" },
  { label: "Certifications", href: "/certifications" },
  { label: "Chat", href: "/chat" },
  { label: "Contact", href: "/contact" },
];

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

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

      {/* Ambient Background Glows */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_1000px_800px_at_50%_-200px,oklch(0.2_0.02_240/0.15),transparent)] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-[20%] size-[600px] bg-[radial-gradient(circle_at_center,oklch(0.94_0.01_240/0.4),transparent)] blur-3xl pointer-events-none" />

      <motion.header
        className="sticky top-4 z-50 mx-auto max-w-6xl px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" as const }}
      >
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center smooth-transition hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="Naga Codex Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={playClickSound}
                className="smooth-transition hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex rounded-full px-6 shadow-lg shadow-primary/20">
            <a href="mailto:chosenfewrecords@hotmail.de">Start a Build</a>
          </Button>

          {/* Mobile Menu Button Placeholder - Ideally this would be a proper mobile menu component */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </Button>
        </div>
      </motion.header>

      <main className="relative mx-auto flex max-w-7xl flex-col gap-24 px-4 py-16 sm:px-6 lg:px-8">
        <motion.section
          id="hero"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 pt-8"
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
              <Badge variant="glass" className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary shadow-sm backdrop-blur-sm">
                Naga Codex • AI Agency
              </Badge>
            </motion.div>

            <div className="space-y-8">
              <motion.h1
                className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl text-smooth leading-[1.1]"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              >
                {"Certified AI Manager orchestrating secure, high-ROI automation.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordReveal}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="text-xl leading-relaxed text-slate-600 max-w-2xl"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              >
                {"Maurice Holda applies a Certified AI Manager playbook at Naga Codex—combining product visioning, governance, and technical leadership so copilots, MCP agents, and web systems ship with measurable impact and trusted guardrails.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordReveal}
                    className="inline-block mr-1.5"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap gap-4" variants={fadeItem}>
              <Button asChild size="lg" className="rounded-full px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                <a
                  href="mailto:chosenfewrecords@hotmail.de"
                  className="inline-flex items-center gap-2"
                >
                  Discuss a Build
                  <ArrowUpRight className="size-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-1 transition-all duration-300">
                <a
                  href="https://mauriceholda-portfolio.vercel.app"
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
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="space-y-1"
                  variants={fadeItem}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
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
                  AI & Cybersecurity Builder
                </h3>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  Human-centered strategist delivering AI copilots and secure web surfaces.
                </p>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -right-4 top-12 flex flex-col gap-3">
              {heroBadges.map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                >
                  <Badge variant="glass" className="bg-white/80 backdrop-blur-md text-slate-900 shadow-lg border-white/50 px-4 py-2 text-xs font-semibold">
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="services"
          className="scroll-mt-32 space-y-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.span
              className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary uppercase tracking-wider"
              variants={fadeItem}
            >
              Services
            </motion.span>
            <motion.h2
              className="text-4xl font-bold text-slate-900 sm:text-5xl"
              variants={titleReveal}
            >
              Full-stack AI product leadership
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 leading-relaxed"
              variants={fadeItem}
            >
              From strategic roadmaps to shipped automation, we handle the entire lifecycle of intelligent systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 border border-slate-200/50 bg-slate-900"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent z-10 pointer-events-none" />
            <video
              src="/images/clips/naga.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto opacity-90"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, idx) => {
              const order = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={service.title}
                  variants={fadeItem}
                  custom={idx}
                >
                  <Card className="h-full bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white hover:border-primary/20 group">
                    <CardHeader>
                      <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-white shadow-inner border border-slate-100 text-primary group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="size-7" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-6">
                      {service.image && (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-100 shadow-sm group-hover:shadow-md transition-all bg-slate-100">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                          />
                        </div>
                      )}
                      <p className="mt-6 text-xs font-bold text-slate-300 tracking-widest">{order}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="work"
          className={`${sectionShell} space-y-12`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4">
              <motion.span
                className="text-sm font-bold uppercase tracking-widest text-primary"
                variants={fadeItem}
              >
                Selected Work
              </motion.span>
              <motion.h2
                className="text-3xl font-bold text-slate-900 sm:text-4xl"
                variants={titleReveal}
              >
                Proof in shipped systems
              </motion.h2>
            </div>
            <Button variant="outline" className="rounded-full border-slate-300">
              View Full Portfolio
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {work.map((item, idx) => (
              <motion.div
                key={item.company}
                variants={fadeItem}
                custom={idx}
              >
                <Card className="h-full bg-slate-900 text-white border-slate-800 hover:border-slate-700 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group">
                  <CardHeader>
                    <CardDescription className="text-slate-400 font-medium mb-2">{item.company}</CardDescription>
                    <CardTitle className="text-2xl text-white group-hover:text-primary-foreground transition-colors">{item.outcome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {item.detail}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      View Case Study <ArrowUpRight className="ml-2 size-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Gallery Section */}
          <motion.div
            className="relative mt-12 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 p-2"
            variants={fadeItem}
          >
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide snap-x">
              {[
                { src: "/images/nagaweb1.png", alt: "AI Image Creation Project" },
                { src: "/images/nagaweb2.png", alt: "AI Automation System" },
                { src: "/images/nagaweb3.png", alt: "Intelligent Video Content" },
              ].map((image, idx) => (
                <div key={idx} className="relative flex-none w-[85vw] sm:w-[400px] aspect-video rounded-2xl overflow-hidden shadow-md snap-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="highlights"
          className="scroll-mt-32 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-12 shadow-xl backdrop-blur-sm grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-8 sm:space-y-10">
            <div className="pt-2">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Portfolio Highlights
              </motion.p>
              <motion.h2
                className="text-2xl sm:text-3xl font-semibold text-white pt-2"
                variants={titleReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Real-world builds from Maurice&apos;s codex
              </motion.h2>
            </div>
            <div className="space-y-8">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                >
                  <Card className="border-slate-200/80 bg-white hover:border-slate-300 card-hover shadow-sm">
                    <CardHeader className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.08 + 0.05 }}
                      >
                        <CardDescription className="uppercase tracking-[0.4em] text-xs text-primary/70">
                          {item.subtitle}
                        </CardDescription>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.08 + 0.1 }}
                      >
                        <CardTitle className="text-2xl text-slate-900">
                          {item.title}
                        </CardTitle>
                      </motion.div>
                    </CardHeader>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 + 0.15 }}
                    >
                      <CardContent className="text-slate-600 leading-relaxed">
                        {item.description}
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Card className="h-full border-slate-200/80 bg-white hover:border-slate-300 card-hover shadow-sm">
              <CardHeader className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CardDescription>About Maurice Holda</CardDescription>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <CardTitle className="text-2xl text-slate-900">
                    Certified AI Manager & security-focused builder
                  </CardTitle>
                </motion.div>
                <motion.p
                  className="text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20, x: -10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  Maurice operates as a Certified AI Manager who bridges discovery, governance,
                  and deployment. He is pursuing CCNA while leading AI programs rooted in
                  CompTIA Security+, MCP automations, and resilient frontend engineering.
                </motion.p>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Education
                  </p>
                  <ul className="mt-3 space-y-3">
                    {education.map((item) => (
                      <li key={item.title}>
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p>{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Languages & Skills
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="space-y-3">
                      {languages.map((language) => (
                        <div key={language.name} className="text-sm space-y-1">
                          <p className="font-semibold text-slate-900">
                            {language.name}
                          </p>
                          <p>{language.level}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Certifications & Publications
                  </p>
                  <ul className="mt-3 space-y-2">
                    {certifications.map((cert) => (
                      <li key={cert} className="text-sm">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-xs uppercase tracking-[0.4em] text-slate-400">
                    Publications
                  </div>
                  <ul className="mt-2 space-y-2 text-sm">
                    {publications.map((pub) => (
                      <li key={pub}>• {pub}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Video Background Section */}
        <motion.section
          className="relative scroll-mt-32 overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl"
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
                className="absolute inset-0 h-full w-full scale-150"
                style={{ pointerEvents: 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            </div>
          </div>
        </motion.section>

        <motion.section
          id="codex"
          className={`${sectionShell} grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1fr_1.2fr]`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-10 sm:space-y-12">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 pt-2"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              The Codex
            </motion.p>
            <motion.h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 pt-2"
              variants={titleReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              How Maurice frames and ships AI engagements
            </motion.h2>
            <motion.p
              className="text-slate-600 leading-relaxed pt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Partnerships start with deep discovery—mapping your value chain, identifying high-leverage moments, and understanding your compliance landscape. This research collapses into a living blueprint that defines success metrics, governance frameworks, and technical architecture. From there, we move through rapid prototyping with 30-day sprint cycles, each delivering measurable outcomes. Telemetry-guided scaling ensures every automation remains explainable, auditable, and trusted. Finally, knowledge transfer embeds the capability into your team, with documentation, training, and ongoing support so you can evolve the system independently.
            </motion.p>
            <Button className="gap-2 pt-2" variant="outline">
              Download the playbook
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
          <div className="space-y-8 sm:space-y-10">
            {principles.map((principle, idx) => (
              <motion.div
                key={principle.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur"
              >
                <motion.p
                  className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 + 0.05 }}
                >
                  {principle.label}
                </motion.p>
                <motion.div
                  className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 + 0.1 }}
                >
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {principle.title}
                  </h3>
                  <Badge className="gradient-primary text-white shadow-md">
                    Naga Codex
                  </Badge>
                </motion.div>
                <motion.p
                  className="mt-5 text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 + 0.15 }}
                >
                  {principle.copy}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="relative scroll-mt-32 overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.25_0.01_0/0.4),oklch(0.15_0.01_0/0.3),transparent_55%)]" />
          <div className="relative grid gap-12 sm:gap-14 px-8 py-12 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:px-12">
            <div className="space-y-10 sm:space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="pt-2"
              >
                <Badge className="bg-white/10 text-white">
                  Ready for launch
                </Badge>
              </motion.div>
              <motion.h2
                className="text-2xl sm:text-3xl font-semibold pt-2"
                variants={titleReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Partner with an AI Manager to orchestrate your next capability.
              </motion.h2>
              <motion.p
                className="text-slate-200 leading-relaxed pt-2"
                initial={{ opacity: 0, y: 20, x: -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                Share your product vision, automation backlog, or governance
                questions. Maurice responds as a Certified AI Manager with the
                first experiment, KPIs, and risk posture within 48 hours.
              </motion.p>
              <div className="flex flex-wrap gap-6">
                <Button asChild className="gap-2 gradient-accent text-white shadow-md hover:shadow-lg hover:scale-[1.02] smooth-transition" variant="secondary">
                  <Link href="/contact">
                    Open contact page
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  <a href="mailto:chosenfewrecords@hotmail.de">
                    chosenfewrecords@hotmail.de
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6 text-sm">
              <p className="text-white/90">
                Prefer staying in the flow? Email Maurice directly or use the
                contact page to share context, timelines, and any compliance needs
                so we can move fast on the right experiment.
              </p>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                Response Time
              </p>
              <p className="text-white/90">Maurice replies within 48 hours with next steps.</p>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="border-t border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-base font-semibold text-slate-900">
              Naga Codex · Maurice Holda
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:chosenfewrecords@hotmail.de"
              className="transition-colors hover:text-slate-900"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/maurice-holda"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/naga_apparel/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              Instagram
            </a>
            <a
              href="https://mauriceholda-portfolio.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              Portfolio
            </a>
            <a
              href="#hero"
              className="transition-colors hover:text-slate-900"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
