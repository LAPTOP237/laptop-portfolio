"use client"

import { motion } from "framer-motion"
import { useMode } from "@/components/provider/mode-provider"
import { Code2, Palette } from "lucide-react"

export function ModeToggle() {
    const { mode, toggleMode } = useMode()
    const isEngineer = mode === "engineer"

    return (
        <div
            onClick={toggleMode}
            className="relative flex items-center cursor-pointer select-none"
            style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                padding: "4px",
                gap: "0",
            }}
        >
            {/* Engineer Tab */}
            <div className="relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300"
                style={{
                    color: isEngineer ? "#fff" : "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                {isEngineer && (
                    <motion.div
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                    <Code2 size={12} />
                    Engineer
                </span>
            </div>

            {/* Designer Tab */}
            <div className="relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300"
                style={{
                    color: !isEngineer ? "#fff" : "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                {!isEngineer && (
                    <motion.div
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                    <Palette size={12} />
                    Designer
                </span>
            </div>
        </div>
    )
}
