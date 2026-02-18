"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

export function Hero() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].hero
    const isEngineer = mode === "engineer"

    const content = isEngineer ? t.engineer : t.designer

    // CTA hrefs based on mode
    const cta1Href = isEngineer ? "/projects" : "/design"
    const cta2Href = isEngineer ? "/#contact" : "/#skills"

    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: "calc(100vh - 80px)", paddingTop: "1.5rem", paddingBottom: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
        >
            {/* Background grid for engineer mode */}
            {isEngineer && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
                        backgroundSize: "32px 32px",
                    }}
                />
            )}

            {/* Glow blob */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "min(500px, 90vw)",
                    height: "min(500px, 90vw)",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${mode}-${lang}`}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16"
                    >
                        {/* ── Left: Text content ── */}
                        <div className="flex-1 text-center md:text-left">
                            {/* Eyebrow */}
                            <div
                                className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--fg-muted)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "4px",
                                }}
                            >
                                {content.eyebrow}
                            </div>

                            {/* Title */}
                            {isEngineer ? (
                                <h1
                                    className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5"
                                    style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}
                                >
                                    {content.title.split("\n").map((line, i) => (
                                        <span key={i} className="block">
                                            {i === 0 ? (
                                                <span style={{ color: "var(--fg)" }}>{line}</span>
                                            ) : (
                                                <span style={{ color: "var(--accent)" }}>{line}</span>
                                            )}
                                        </span>
                                    ))}
                                </h1>
                            ) : (
                                <h1
                                    className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-5"
                                    style={{ fontFamily: "var(--font-sans)", color: "var(--fg)" }}
                                >
                                    {content.title.split("\n").map((line, i) => (
                                        <span key={i} className="block">
                                            {i === 1 ? (
                                                <>
                                                    <span style={{ color: "var(--accent)" }}>{line.split(" ").slice(0, 1).join(" ")}</span>{" "}
                                                    <span>{line.split(" ").slice(1).join(" ")}</span>
                                                </>
                                            ) : (
                                                <span>{line}</span>
                                            )}
                                        </span>
                                    ))}
                                </h1>
                            )}

                            {/* Description */}
                            <p
                                className="text-sm max-w-md mb-7 leading-relaxed mx-auto md:mx-0"
                                style={{ color: "var(--fg-muted)" }}
                            >
                                {content.description}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                                <Link
                                    href={cta1Href}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium"
                                    style={
                                        isEngineer
                                            ? { background: "var(--accent)", color: "#fff", fontFamily: "var(--font-mono)", borderRadius: "4px" }
                                            : { border: "1px solid var(--fg)", color: "var(--fg)", borderRadius: "9999px" }
                                    }
                                >
                                    {content.cta1}
                                </Link>
                                <Link
                                    href={cta2Href}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium"
                                    style={
                                        isEngineer
                                            ? { border: "1px solid var(--border)", color: "var(--fg)", fontFamily: "var(--font-mono)", borderRadius: "4px" }
                                            : { background: "var(--accent)", color: "#fff", borderRadius: "9999px" }
                                    }
                                >
                                    {content.cta2}
                                </Link>
                            </div>
                        </div>

                        {/* ── Right: Profile photo ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                            className="flex-shrink-0"
                        >
                            <div
                                className="relative"
                                style={{
                                    width: "clamp(160px, 28vw, 260px)",
                                    height: "clamp(160px, 28vw, 260px)",
                                }}
                            >
                                {/* Accent ring */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(var(--accent) 0deg, transparent 120deg, var(--accent) 240deg, transparent 360deg)`,
                                        padding: "3px",
                                        borderRadius: isEngineer ? "12px" : "50%",
                                    }}
                                />
                                {/* Photo */}
                                <div
                                    className="absolute inset-[3px] overflow-hidden"
                                    style={{
                                        borderRadius: isEngineer ? "10px" : "50%",
                                        border: "2px solid var(--bg)",
                                    }}
                                >
                                    <Image
                                        src="/maphoto.jfif"
                                        alt="Alain Pascal LINJOUOM"
                                        fill
                                        className="object-cover object-top"
                                        priority
                                        sizes="(max-width: 768px) 160px, 260px"
                                    />
                                </div>
                                {/* Mode badge */}
                                <div
                                    className="absolute -bottom-2 -right-2 px-2 py-1 text-[9px] font-bold tracking-widest rounded"
                                    style={{
                                        background: "var(--accent)",
                                        color: "#fff",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    {isEngineer ? "DEV" : "DESIGN"}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
