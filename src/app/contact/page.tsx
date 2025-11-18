"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useRef } from "react";

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
  { label: "Company", value: "nagaswap.com", href: "https://nagaswap.com" },
  { label: "Instagram", value: "@naga_apparel", href: "https://instagram.com/naga_apparel" },
];

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
    <div className="min-h-screen bg-gradient-to-b from-background via-white to-white text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-12">
        <Link
          href="/"
          onClick={playClickSound}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to homepage
        </Link>
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-200 bg-white/90">
            <CardHeader className="space-y-4">
              <Badge className="w-fit bg-primary/10 text-primary">Contact</Badge>
              <CardTitle className="text-3xl text-slate-900">
                Share your brief, timeline, or challenge with a Certified AI Manager.
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                Tell Maurice about the outcomes you&apos;re chasing. Include any
                required compliance standards, existing infrastructure, and the
                team members involved so he can design a manager-level roadmap,
                governance model, and the first experiment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Typical response
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  48 hours
                </p>
                <p className="mt-1">
                  You&apos;ll get a short plan with risk considerations, stack
                  ideas, and a call link if it makes sense to go deeper.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Current focus
                  </p>
                  <p className="text-slate-900">
                    CCNA certification, AI security builds, MCP automations.
                  </p>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Based in
                  </p>
                  <p className="inline-flex items-center gap-2 text-slate-900">
                    <MapPin className="size-4" />
                    Hamburg, Germany · Remote worldwide
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full gap-2 text-base"
              >
                <a href="mailto:chosenfewrecords@hotmail.de">
                  Compose an email
                  <Mail className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full gap-2 text-base"
              >
                <a href="tel:+4917627255188">
                  Call Maurice
                  <Phone className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                Channels & signals
              </CardTitle>
              <CardDescription>
                Prefer async updates? Choose the channel that fits your workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex flex-col gap-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600"
                >
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {channel.label}
                  </span>
                  <Link
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      channel.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-flex items-center gap-1 text-base font-semibold text-slate-900 transition-colors hover:text-primary"
                  >
                    {channel.value}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

