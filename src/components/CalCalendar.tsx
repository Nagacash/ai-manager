"use client";
import { motion } from "framer-motion";

export default function CalCalendar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative w-full h-[650px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-primary/20"
        >
            {/* Holographic Overlays */}
            <div className="absolute inset-0 pointer-events-none z-20">
                {/* Advanced Scanning Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Scanning Line - Faster, more precise */}
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan top-0 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />

                {/* Depth & Noise */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* System Frame Accents - Sharper, technical */}
                <div className="absolute top-6 left-6 size-12 border-t-[1px] border-l-[1px] border-primary/30 rounded-tl-xl" />
                <div className="absolute top-6 right-6 size-12 border-t-[1px] border-r-[1px] border-primary/30 rounded-tr-xl" />
                <div className="absolute bottom-6 left-6 size-12 border-b-[1px] border-l-[1px] border-primary/30 rounded-bl-xl" />
                <div className="absolute bottom-6 right-6 size-12 border-b-[1px] border-r-[1px] border-primary/30 rounded-br-xl" />

                {/* Dynamic Data Decals */}
                <div className="absolute top-8 left-20 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),1)]" />
                        <span className="text-[9px] font-display tracking-[0.4em] text-primary/80 uppercase">Protocol: Secure_Engagement</span>
                    </div>
                    <span className="text-[7px] font-mono text-slate-600 tracking-widest pl-3.5 italic">[UPLINK: ACTIVE_0x7F]</span>
                </div>

                <div className="absolute bottom-8 left-20">
                    <span className="text-[8px] font-mono text-slate-500 tracking-tighter uppercase opacity-40">
                        [LATENCY: 12ms] [ENCRYPTION: AES-GCM]
                    </span>
                </div>
            </div>

            {/* Iframe for Calendar */}
            <iframe
                src="https://cal.com/chosenfewrecords-hamburg-ogbut4/30min?embed=true&layout=month_view&theme=dark"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{
                    border: "none",
                    display: "block",
                    background: "transparent"
                }}
                allow="camera; microphone; fullscreen; payment"
                className="relative z-10 transition-all duration-700 opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0 scale-[1.01] group-hover:scale-100"
            />

            <style jsx>{`
                @keyframes scan {
                    0% { top: -5%; }
                    100% { top: 105%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </motion.div>
    );
}
