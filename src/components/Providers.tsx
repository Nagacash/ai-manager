"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}
