"use client"

import React, { createContext, useContext, useState } from "react"

type Lang = "fr" | "en"

interface LanguageContextType {
    lang: Lang
    toggleLang: () => void
    setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("fr")

    const toggleLang = () => {
        setLang((prev) => (prev === "fr" ? "en" : "fr"))
    }

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
