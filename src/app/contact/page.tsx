"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PerlinNoiseBackground from "@/components/PerlinNoiseBackground";
import Cal, { getCalApi } from "@calcom/embed-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactChannels = [
  {
    label: "Email",
    value: "chosenfewrecords@hotmail.de",
    href: "mailto:chosenfewrecords@hotmail.de",
  },
  { label: "Phone", value: "+49 176 2725 5188", href: "tel:+4917627255188" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/maurice-holda",
    href: "https://linkedin.com/in/maurice-holda",
  },
  {
    label: "Portfolio",
    value: "mauriceholda-portfolio.vercel.app",
    href: "https://mauriceholda-portfolio.vercel.app",
  },
  {
    label: "Cyber Lab",
    value: "cyber-sec-six.vercel.app",
    href: "https://cyber-sec-six.vercel.app",
  },
  {
    label: "Company",
    value: "naga-apparel.com",
    href: "https://naga-apparel.com",
  },
  {
    label: "Instagram",
    value: "@naga_apparel",
    href: "https://instagram.com/naga_apparel",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ContactPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      const audio = new Audio("/images/sound/mouse.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
      audioRef.current = audio;
    }
  };

  return (
    <div className="min-h-screen bg-black text-foreground relative overflow-hidden selection:bg-brand-cyan/30 selection:text-white">
      <PerlinNoiseBackground />

      {/* Ambient Glow Effects */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 sm:px-8 lg:px-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-brand-cyan group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to homepage
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.section
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-glow-strong leading-[1.05]">
            Let&apos;s Build
            <span className="block bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent">
              Something Wild
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed text-glow">
            Share your brief, timeline, or challenge. I&apos;ll design a
            manager-level roadmap, governance model, and the first experiment.
          </p>
        </motion.section>

        {/* Main Content Grid */}
        <motion.section
          className="grid gap-8 lg:grid-cols-[1fr_1.2fr]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Info Cards */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Info Card */}
            <Card className="glass-card border-border/50 overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-cyan/10">
                    <Zap className="size-5 text-brand-cyan" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-cyan font-medium">
                    Response Time
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-bold text-white text-glow">48h</p>
                  <p className="text-slate-400 leading-relaxed">
                    You&apos;ll get a comprehensive plan with risk
                    considerations, stack ideas, and next steps.
                  </p>
                </div>
              </CardHeader>
            </Card>

            {/* Location & Focus */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="glass-card border-border/50">
                <CardContent className="p-6 space-y-3">
                  <MapPin className="size-5 text-brand-purple" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium mb-1">
                      Based in
                    </p>
                    <p className="text-white font-semibold">Hamburg, Germany</p>
                    <p className="text-slate-500 text-sm">Remote worldwide</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-brand-cyan font-medium">
                      Available
                    </span>
                  </div>
                  <p className="text-white font-semibold leading-relaxed">
                    CCNA, AI security builds, MCP automations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Channels */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <span className="text-brand-cyan">#</span> Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contactChannels.map((channel, idx) => (
                  <motion.div
                    key={channel.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                  >
                    <Link
                      href={channel.href}
                      target={
                        channel.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        channel.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-brand-cyan/30 hover:bg-brand-cyan/5 transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.15em] text-slate-500 group-hover:text-brand-cyan/70 transition-colors">
                          {channel.label}
                        </span>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                          {channel.value}
                        </span>
                      </div>
                      <ArrowUpRight className="size-4 text-slate-600 group-hover:text-brand-cyan transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="flex-1 gap-2 h-14 bg-brand-cyan hover:bg-brand-cyan/90 text-background font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-cyan/25"
              >
                <a href="mailto:chosenfewrecords@hotmail.de">
                  <Mail className="size-4" />
                  Send Email
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 gap-2 h-14 border-border hover:bg-secondary text-foreground rounded-xl transition-all hover:-translate-y-0.5"
              >
                <a href="tel:+4917627255188">
                  <Phone className="size-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Cal.com Booking */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-border/50 overflow-hidden h-full">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                    <Calendar className="size-6 text-brand-purple" />
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase tracking-[0.2em] text-brand-purple border-brand-purple/30 bg-brand-purple/10"
                    >
                      Schedule
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold text-white text-glow">
                    Book a Strategy Session
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-400">
                    Skip the back-and-forth. Pick a time that works for you.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[650px] bg-black border-t border-border/50">
                  <Cal
                    namespace="30min"
                    calLink="chosenfewrecords-hamburg-ogbut4/30min"
                    style={{ width: "100%", height: "100%" }}
                    config={{
                      layout: "month_view",
                      useSlotsViewOnSmallScreen: "true",
                      theme: "dark",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Bottom Quote */}
        <motion.section
          className="text-center py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-2xl md:text-3xl font-display font-bold text-white/80 italic">
            &ldquo;Direct access to AI strategy and execution.&rdquo;
          </p>
          <p className="mt-4 text-brand-cyan font-medium">
            No middlemen, just results.
          </p>
        </motion.section>
      </main>
    </div>
  );
}
