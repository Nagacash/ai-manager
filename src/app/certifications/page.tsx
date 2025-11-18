"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowLeft, FileText, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const certificationList = [
  {
    title: "CompTIA Security+",
    description:
      "Industry-leading cybersecurity certification validating skills in threat management, risk assessment, and secure systems architecture.",
    file: "/images/pdf/CompTIA.pdf",
  },
  {
    title: "Cybersecurity Certificate",
    description:
      "Comprehensive cybersecurity training covering network security, threat detection, incident response, and secure system design principles.",
    file: "/images/pdf/cyber.pdf",
  },
  {
    title: "Web Design Certificate",
    description:
      "Professional web development certification focusing on modern design principles, responsive layouts, and user experience optimization.",
    file: "/images/pdf/webdesign.pdf",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
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
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-12">
        <Link
          href="/"
          onClick={playClickSound}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to homepage
        </Link>
        <motion.section
          className="space-y-8"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                My Certifications
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Verified credentials and professional achievements
              </h1>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {certificationList.map((cert) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group h-full border-slate-200 bg-white/80 transition-all hover:shadow-lg">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-primary/10 text-primary ring-2 ring-primary/20">
                        <FileText className="m-3 size-6" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        <CardDescription className="text-base text-slate-600">
                          {cert.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div 
                      className="group relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors"
                      onClick={() => setSelectedCert(cert.file)}
                    >
                      <iframe
                        src={`${cert.file}#toolbar=0&navpanes=0&zoom=120`}
                        className="w-full border-0 pointer-events-none"
                        title={`${cert.title} Certificate`}
                        style={{ 
                          display: 'block',
                          width: '100%',
                          height: '700px',
                          minHeight: '700px'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none">
                        <p className="text-sm text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1.5 rounded-lg shadow-sm">
                          Click to view full size
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setSelectedCert(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  {certificationList.find(c => c.file === selectedCert)?.title}
                </h2>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="size-5 text-slate-600" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={`${selectedCert}#toolbar=0&navpanes=0&zoom=page-fit`}
                  className="w-full h-full border-0"
                  title="Certificate PDF"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


