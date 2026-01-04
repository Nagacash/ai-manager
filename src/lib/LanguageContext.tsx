"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { translations } from "@/lib/translations";

type Language = "en" | "de";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>("en");

    useEffect(() => {
        const saved = localStorage.getItem("naga-lang") as Language;
        if (saved && (saved === "en" || saved === "de")) {
            setLangState(saved);
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (browserLang === "de") setLangState("de");
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("naga-lang", newLang);
    };

    const t = (path: string) => {
        const keys = path.split(".");
        // Start with the top-level translation object typed as any to allow string indexing
        let traversal: any = translations[lang] || translations['en'];

        for (const key of keys) {
            // Safety check: if traversal path is broken, return the key path
            if (traversal === undefined || traversal === null) return path;

            // Move deeper
            traversal = traversal[key];
        }

        // If we found nothing (undefined), return the path key
        return traversal === undefined ? path : traversal;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
