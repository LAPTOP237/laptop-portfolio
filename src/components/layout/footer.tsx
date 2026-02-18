"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

export function Footer() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].footer
    const isEngineer = mode === "engineer"
    const now = new Date()
    const buildId = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}_stable`

    return (
        <footer className="py-5 px-4 md:px-6 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Left: Status */}
                <div>
                    <div
                        className="text-xs font-bold"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                    >
                        {t.status}
                    </div>
                    {isEngineer && (
                        <div
                            className="text-xs mt-0.5"
                            style={{ fontFamily: "var(--font-mono)", color: "var(--fg-subtle)" }}
                        >
                            build_id: {buildId}
                        </div>
                    )}
                </div>

                {/* Right: Copyright + Socials */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span className="text-xs" style={{ color: "var(--fg-muted)" }}>
                        © {now.getFullYear()} Alain Pascal LINJOUOM · {t.rights}
                    </span>
                    <div className="flex items-center gap-2">
                        {[
                            { icon: <Github size={13} />, href: "https://github.com/LAPTOP237" },
                            { icon: <Linkedin size={13} />, href: "https://linkedin.com/in/alain-linjouom" },
                            { icon: <Mail size={13} />, href: "mailto:linjouom9@gmail.com" },
                        ].map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
