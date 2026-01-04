"use client";

import { motion } from "framer-motion";
import ChatBot from "@/components/ChatBot";
import PerlinNoiseBackground from "@/components/PerlinNoiseBackground";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground relative">
      <PerlinNoiseBackground />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_800px_600px_at_50%_-100px,oklch(0.25_0.01_0/0.3),oklch(0.15_0.01_0/0.2),transparent)] blur-3xl" />
      
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/90 backdrop-blur-md shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-12">
          <Link href="/" className="flex items-center gap-2 smooth-transition hover:opacity-80">
            <ArrowLeft className="size-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Back to Home</span>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <motion.section
          className="scroll-mt-32 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white via-slate-50/50 to-white p-6 sm:p-10 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-6">
            <motion.h1
              className="text-3xl sm:text-4xl font-semibold text-foreground mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Chat with Maie
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Your AI assistant powered by OpenAI. Ask me anything!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ChatBot />
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

