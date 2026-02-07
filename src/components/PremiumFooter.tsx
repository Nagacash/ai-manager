"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FooterProps {
  navLinks: Array<{ name: string; href: string }>;
}

export default function PremiumFooter({ navLinks }: FooterProps) {
  return (
    <footer className="relative bg-gradient-to-b from-background to-black border-t border-white/10 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8 py-20">
        {/* Main Footer Content */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start gap-16 pb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Section */}
          <div className="space-y-8 max-w-sm">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={160}
                height={45}
                className="dark:invert opacity-90"
              />
            </motion.div>

            <p className="text-slate-300 font-medium leading-relaxed text-base">
              Human-centered strategist delivering AI coproductions and secure
              digital surfaces.
            </p>

            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="size-4 text-purple-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Premium Portfolio
              </span>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-20">
            {/* Navigation */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                Navigation
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group text-sm font-bold text-slate-300 hover:text-white transition-all inline-flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Social
              </h4>
              <ul className="space-y-4">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                >
                  <a
                    href="https://linkedin.com/in/maurice-holda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm font-bold text-slate-300 hover:text-white transition-all inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-400 group-hover:w-4 transition-all duration-300" />
                    LinkedIn
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                >
                  <a
                    href="https://instagram.com/naga_apparel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm font-bold text-slate-300 hover:text-white transition-all inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-400 group-hover:w-4 transition-all duration-300" />
                    Instagram
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            © 2026 Naga Codex · Designed by Maurice Holda
          </p>

          <div className="flex items-center gap-8">
            <div className="flex gap-8">
              <Link
                href="/policies"
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Privacy
              </Link>
              <Link
                href="/policies"
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Legal
              </Link>
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full size-11 border-white/20 bg-white/5 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-white/40 text-slate-300 hover:text-white transition-all backdrop-blur-sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUp className="size-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
