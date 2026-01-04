"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useLayoutEffect } from "react";
import { ArrowLeft, FileText, X, Award, Shield, Layout, Settings } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const certificationList = [
  {
    title: "Certified AI Manager",
    description:
      "Professional certification for AI Management, focusing on governance, strategy, and technical leadership in AI systems deployment.",
    file: "/images/pdf/KI-Manager.badge.pdf",
    icon: Award,
    color: "oklch(0.65 0.2 300)",
  },
  {
    title: "CompTIA Security+",
    description:
      "Industry-leading cybersecurity certification validating skills in threat management, risk assessment, and secure systems architecture.",
    file: "/images/pdf/CompTIA.pdf",
    icon: Shield,
    color: "oklch(0.7 0.15 150)",
  },
  {
    title: "Cybersecurity Graduate",
    description:
      "Comprehensive cybersecurity graduation covering network security, threat detection, incident response, and secure system design principles.",
    file: "/images/pdf/cyber.pdf",
    icon: Shield,
    color: "oklch(0.6 0.18 300)",
  },
  {
    title: "Web Design Certificate",
    description:
      "Professional web development certification focusing on modern design principles, responsive layouts, and user experience optimization.",
    file: "/images/pdf/webdesign.pdf",
    icon: Layout,
    color: "oklch(0.65 0.15 40)",
  },
];

const useMagnetic = () => {
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      gsap.to(el, {
        x: distanceX * 0.3,
        y: distanceY * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
};

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".floating-blob");
      elements?.forEach((el, i) => {
        gsap.to(el, {
          x: "random(-150, 150)",
          y: "random(-150, 150)",
          duration: "random(15, 25)",
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: i * 0.8,
        });
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 40;
        const yPercent = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".floating-blob", {
          x: (i) => xPercent * (i + 1) * 0.5,
          y: (i) => yPercent * (i + 1) * 0.5,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] floating-blob" />
      <div className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] bg-blue-500/15 rounded-full blur-[120px] floating-blob" />
      <div className="absolute bottom-[-15%] left-[10%] w-[55%] h-[55%] bg-purple-500/15 rounded-full blur-[150px] floating-blob" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[110px] floating-blob" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
};

export default function CertificationsPage() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useMagnetic();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      const tl = gsap.timeline();

      tl.from(headerRef.current?.querySelectorAll("p, h1, a") || [], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });

      // Cards Staggered Animation
      gsap.from(".cert-card", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });

      // Magnetic effect for buttons inside cards
      const magneticButtons = document.querySelectorAll(".magnetic-btn");
      magneticButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e: any) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = btn.getBoundingClientRect();
          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const x = (clientX - centerX) * 0.4;
          const y = (clientY - centerY) * 0.4;

          gsap.to(btn, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power2.out",
          });

          const text = btn.querySelector("span");
          if (text) {
            gsap.to(text, {
              x: x * 0.5,
              y: y * 0.5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
          const text = btn.querySelector("span");
          if (text) {
            gsap.to(text, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)",
            });
          }
        });
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    } else {
      const audio = new Audio("/images/sound/mouse.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => { });
      audioRef.current = audio;
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1200,
    });

    // Update spotlight custom properties
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] text-foreground font-sans overflow-x-hidden">
      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-32 sm:px-8 lg:px-12">

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-primary/20">
              {t("nav.certifications")}
            </Badge>
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            {t("certifications.title")}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            {t("certifications.description")}
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-10 md:grid-cols-1 lg:grid-cols-2">
          {certificationList.map((cert) => (
            <div
              key={cert.title}
              className="cert-card"
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
            >
              <Card className="glass-panel group h-full border-slate-200/40 shadow-sm transition-all hover:shadow-2xl hover:border-primary/20 overflow-hidden relative">
                {/* Spotlight effect placeholder - can be refined with more GSAP if needed */}
                <div className="absolute inset-0 bg-radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.05)_0%,transparent_50%) opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="p-8 pb-4 relative z-10">
                  <div className="flex items-start gap-6">
                    <div
                      className="flex-shrink-0 size-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-sm"
                      style={{ backgroundColor: `${cert.color.replace(')', ' / 0.15)')}`, color: cert.color, border: `1px solid ${cert.color.replace(')', ' / 0.2)')}` }}
                    >
                      <cert.icon className="size-8" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold tracking-tight text-foreground leading-tight">
                          {cert.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {cert.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-4 relative z-10">
                  <div
                    className="group/preview relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-inner cursor-pointer transition-all hover:border-primary/20"
                    onClick={() => {
                      playClickSound();
                      setSelectedCert(cert.file);
                    }}
                  >
                    <div className="aspect-[16/11] overflow-hidden grayscale-[0.3] group-hover/preview:grayscale-0 transition-all duration-700 bg-slate-200">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <FileText className="size-10 text-slate-400/50" />
                      </div>
                      <iframe
                        src={`${cert.file}#toolbar=0&navpanes=0&zoom=100`}
                        className="w-full h-[150%] -mt-[10%] border-0 pointer-events-none transition-transform duration-700 group-hover/preview:scale-[1.05]"
                        title={`${cert.title} Preview`}
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/preview:bg-primary/5 transition-all duration-300">
                      <div className="translate-y-4 opacity-0 group-hover/preview:translate-y-0 group-hover/preview:opacity-100 transition-all duration-300">
                        <span className="magnetic-btn inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-foreground shadow-xl border border-slate-100">
                          <span className="inline-block">View full certificate</span>
                          <Award className="size-4 text-primary" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* Modern PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground leading-none">
                      {certificationList.find(c => c.file === selectedCert)?.title}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Official Document Preview</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="flex-1 bg-slate-100/50 p-4 md:p-8 overflow-hidden">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <iframe
                    src={`${selectedCert}#toolbar=1&navpanes=1&zoom=page-fit`}
                    className="w-full h-full"
                    title="Certificate Full View"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



