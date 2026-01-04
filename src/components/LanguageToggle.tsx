"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LanguageToggle() {
    const { lang, setLang } = useLanguage();

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
            <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${lang === "en" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLang("de")}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${lang === "de" ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                    }`}
            >
                DE
            </button>
        </div>
    );
}
