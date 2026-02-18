"use client"

import { useLanguage } from "@/components/provider/language-provider"

export function LangToggle() {
    const { lang, toggleLang } = useLanguage()

    return (
        <button
            onClick={toggleLang}
            className="text-xs font-medium transition-colors px-2 py-1 rounded"
            style={{
                fontFamily: "var(--font-mono)",
                color: "var(--fg-muted)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {lang === "fr" ? "EN" : "FR"}
        </button>
    )
}
