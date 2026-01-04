"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
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

const contactChannels = [
  { label: "Email", value: "chosenfewrecords@hotmail.de", href: "mailto:chosenfewrecords@hotmail.de" },
  { label: "Phone", value: "+49 176 2725 5188", href: "tel:+4917627255188" },
  { label: "LinkedIn", value: "linkedin.com/in/maurice-holda", href: "https://linkedin.com/in/maurice-holda" },
  { label: "Portfolio", value: "mauriceholda-portfolio.vercel.app", href: "https://mauriceholda-portfolio.vercel.app" },
  { label: "Cybersecurity Lab", value: "cyber-sec-six.vercel.app", href: "https://cyber-sec-six.vercel.app" },
  { label: "Company", value: "naga-apparel.com", href: "https://naga-apparel.com" },
  { label: "Instagram", value: "@naga_apparel", href: "https://instagram.com/naga_apparel" },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

export default function ContactPage() {
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

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to homepage
          </Link>
        </motion.div>

        <motion.section
          className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full border-white/40 bg-white/60 backdrop-blur-xl shadow-xl">
              <CardHeader className="space-y-6">
                <Badge variant="glass" className="w-fit bg-primary/10 text-primary border-primary/20">Contact</Badge>
                <CardTitle className="text-4xl font-bold text-foreground leading-tight">
                  Share your brief, timeline, or challenge with a Certified AI Manager.
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  Tell Maurice about the outcomes you&apos;re chasing. Include any
                  required compliance standards, existing infrastructure, and the
                  team members involved so he can design a manager-level roadmap,
                  governance model, and the first experiment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 text-sm text-muted-foreground pt-6">
                <div className="rounded-2xl border border-slate-200/60 bg-white/50 p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-bold">
                    Typical response
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    48 hours
                  </p>
                  <p className="mt-2 text-base">
                    You&apos;ll get a short plan with risk considerations, stack
                    ideas, and a call link if it makes sense to go deeper.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white/50 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-bold">
                      Current focus
                    </p>
                    <p className="text-foreground font-medium leading-relaxed">
                      CCNA certification, AI security builds, MCP automations.
                    </p>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white/50 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-bold">
                      Based in
                    </p>
                    <p className="inline-flex items-center gap-2 text-foreground font-medium">
                      <MapPin className="size-4 text-primary" />
                      Hamburg, Germany
                    </p>
                    <p className="text-slate-500 text-xs">Remote worldwide</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 gap-2 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    <a href="mailto:chosenfewrecords@hotmail.de">
                      Compose an email
                      <Mail className="size-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2 text-base rounded-full border-slate-300 hover:bg-white hover:text-primary transition-all"
                  >
                    <a href="tel:+4917627255188">
                      Call Maurice
                      <Phone className="size-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="border-white/40 bg-white/60 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Channels & signals
                </CardTitle>
                <CardDescription>
                  Prefer async updates? Choose the channel that fits your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactChannels.map((channel, idx) => (
                  <motion.div
                    key={channel.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="group flex flex-col gap-1 rounded-xl border border-slate-200/60 bg-white/40 px-5 py-4 text-sm text-muted-foreground transition-all hover:bg-white hover:shadow-md hover:border-primary/20"
                  >
                    <span className="text-xs uppercase tracking-[0.4em] text-slate-400 group-hover:text-primary/70 transition-colors">
                      {channel.label}
                    </span>
                    <Link
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        channel.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary"
                    >
                      {channel.value}
                      <ArrowUpRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/40 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
              <CardContent className="p-8">
                <p className="text-lg font-medium mb-2">Ready to start?</p>
                <p className="text-slate-300 text-sm mb-6">
                  Direct access to AI strategy and execution. No middlemen, just results.
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Available for new projects
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

