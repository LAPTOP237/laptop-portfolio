"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Mode = "engineer" | "designer"

interface ModeContextType {
    mode: Mode
    toggleMode: () => void
    setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>("engineer")

    const toggleMode = () => {
        setMode((prev) => (prev === "engineer" ? "designer" : "engineer"))
    }

    return (
        <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
            <div data-mode={mode} className="transition-colors duration-500 ease-in-out">
                {children}
            </div>
        </ModeContext.Provider>
    )
}

export function useMode() {
    const context = useContext(ModeContext)
    if (context === undefined) {
        throw new Error("useMode must be used within a ModeProvider")
    }
    return context
}
