"use client"

import * as React from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LangToggle } from "@/components/ui/lang-toggle"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { FileText, Menu, X, Mail } from "lucide-react"

// ── Laptop icon shaped like the letter "L" ────────────────────────────────
// Side-profile of a laptop: vertical screen = L's vertical bar,
// horizontal keyboard base = L's horizontal bar.
function LaptopIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg
            width={size * 0.75}   // narrower — letter-width ratio
            height={size}
            viewBox="0 0 14 20"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
        >
            {/* Screen — vertical bar of the L */}
            <rect x="1" y="1" width="9" height="12" rx="1.5" />
            {/* Hinge dot */}
            <circle cx="10" cy="13" r="0.6" fill={color} stroke="none" />
            {/* Keyboard base — horizontal bar of the L */}
            <rect x="1" y="14" width="12" height="4" rx="1" />
        </svg>
    )
}

export function Header() {
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = React.useState(false)
    const [menuOpen, setMenuOpen] = React.useState(false)
    const { mode } = useMode()
    const { lang } = useLanguage()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20)
    })

    const isEngineer = mode === "engineer"

    // ── Engineer nav ──────────────────────────────────────────
    // Home(About) · Skills · Formation · Projects · Hire_me · CV
    const engineerNav = [
        { label: lang === "fr" ? "Acceuil" : "Home", href: "/" },
        { label: lang === "fr" ? "01. À propos" : "01. About", href: "/about" },
        { label: lang === "fr" ? "02. Compétences" : "02. Skills", href: "/#skills" },
        { label: lang === "fr" ? "03. Formation" : "03. Education", href: "/#roadmap" },
        { label: lang === "fr" ? "04. Projets" : "04. Projects", href: "/projects" },
    ]

    // ── Designer nav ──────────────────────────────────────────
    // Home(About) · About · Skills(outils+compétences+philosophie) · Studio(réalisations) · Hire_me · CV
    const designerNav = [
        { label: lang === "fr" ? "Acceuil" : "Home", href: "/" },
        { label: lang === "fr" ? "À propos" : "About", href: "/about" },
        { label: lang === "fr" ? "Outils" : "Skills", href: "/#skills" },
        { label: lang === "fr" ? "Studio" : "Studio", href: "/design" },
    ]

    const navItems = isEngineer ? engineerNav : designerNav
    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50"
                style={{
                    background: scrolled ? "rgba(10, 14, 26, 0.92)" : "transparent",
                    backdropFilter: scrolled ? "blur(16px)" : "none",
                    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                    transition: "background 0.3s, border-color 0.3s",
                }}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                {/* Main row */}
                <div className="flex items-center justify-between px-4 md:px-6 h-12">
                    {/* Logo — 💻APTOP */}
                    <Link href="/" className="flex items-center gap-0 group select-none">
                        {/* Laptop SVG icon (left) */}
                        <LaptopIcon size={18} color="var(--accent)" />
                        {/* APTOP text */}
                        <span
                            className="text-sm font-black tracking-tight"
                            style={{
                                fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                                color: "var(--fg)",
                                letterSpacing: isEngineer ? "0.04em" : "0.06em",
                            }}
                        >
                            APTOP
                        </span>
                    </Link>


                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-5">
                        {navItems.map((item) => (
                            <Link
                                key={item.href + item.label}
                                href={item.href}
                                className="text-xs transition-colors hover-underline"
                                style={{ color: "var(--fg-muted)", fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Controls — right side */}
                    <div className="flex items-center gap-2">
                        {/* Hire Me */}
                        <Link
                            href="/#contact"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)", fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}
                        >
                            <Mail size={10} />
                            {lang === "fr" ? "Hire me" : "Hire me"}
                        </Link>
                        {/* Download CV */}
                        <a
                            href="/cv.pdf"
                            download
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                            style={{ background: "var(--accent)", color: "#fff", fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}
                        >
                            <FileText size={10} />
                            CV
                        </a>
                        {/* Lang + Theme */}
                        <ThemeToggle />
                        <LangToggle />
                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-1.5 rounded"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--fg-muted)" }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={14} /> : <Menu size={14} />}
                        </button>
                    </div>
                </div>

                {/* Mode toggle row */}
                <div className="flex justify-center pb-2">
                    <ModeToggle />
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden px-4 pb-4 flex flex-col gap-3"
                        style={{ borderTop: "1px solid var(--border)", background: "rgba(10,14,26,0.97)", backdropFilter: "blur(16px)" }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href + item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="text-sm py-1"
                                style={{ color: "var(--fg-muted)", fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex gap-2 pt-1">
                            <Link
                                href="/#contact"
                                onClick={closeMenu}
                                className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--fg)" }}
                            >
                                <Mail size={10} />
                                Hire me
                            </Link>
                            <a
                                href="/cv.pdf"
                                download
                                onClick={closeMenu}
                                className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium"
                                style={{ background: "var(--accent)", color: "#fff", fontFamily: "var(--font-mono)" }}
                            >
                                <FileText size={11} />
                                CV
                            </a>
                        </div>
                    </motion.div>
                )}
            </motion.header>
        </>
    )
}
