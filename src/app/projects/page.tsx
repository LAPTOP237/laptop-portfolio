"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Briefcase, GraduationCap, Users, Github, ExternalLink } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary, projects } from "@/lib/data"

type Tab = "professional" | "school" | "personal"

const tabs: { id: Tab; icon: React.ReactNode; fr: string; en: string; color: string }[] = [
    { id: "professional", icon: <Briefcase size={13} />, fr: "Pro & Stages", en: "Pro & Internships", color: "#3b82f6" },
    { id: "school", icon: <GraduationCap size={13} />, fr: "Projets École", en: "School Projects", color: "#a855f7" },
    { id: "personal", icon: <Users size={13} />, fr: "Perso & Groupe", en: "Personal & Group", color: "#10b981" },
]

export default function ProjectsPage() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].projects
    const isEngineer = mode === "engineer"

    const [activeTab, setActiveTab] = useState<Tab>("professional")

    // Engineer-only guard
    if (!isEngineer) {
        return (
            <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
                <Header />
                <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="text-5xl mb-4">🔒</div>
                    <h1 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>
                        {lang === "fr" ? "Mode Développeur requis" : "Developer Mode required"}
                    </h1>
                    <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>
                        {lang === "fr"
                            ? "Cette section est réservée au mode développeur. Basculez le mode depuis la page d'accueil."
                            : "This section is for developer mode only. Switch mode from the home page."}
                    </p>
                    <Link href="/" className="text-xs px-5 py-2 rounded-full" style={{ background: "var(--accent)", color: "#fff" }}>
                        {lang === "fr" ? "← Retour à l'accueil" : "← Back to home"}
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    const tabProjects = projects.filter((p) => p.category === activeTab)
    const activeTabMeta = tabs.find((t) => t.id === activeTab)!

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <Header />
            <div className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto">

                {/* Back link */}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs transition-colors" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                        <ArrowLeft size={13} />
                        {t.backToProjects}
                    </Link>
                </motion.div>

                {/* Page header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}>
                        {`> ${t.archiveTitle}`}
                    </h1>
                    <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                        {lang === "fr"
                            ? `${projects.length} projets — développement web, mobile, desktop et systèmes.`
                            : `${projects.length} projects — web, mobile, desktop and systems development.`}
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => {
                        const count = projects.filter((p) => p.category === tab.id).length
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all"
                                style={{
                                    background: isActive ? tab.color : "var(--bg-card)",
                                    color: isActive ? "#fff" : "var(--fg-muted)",
                                    border: isActive ? `1px solid ${tab.color}` : "1px solid var(--border)",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {tab.icon}
                                {lang === "fr" ? tab.fr : tab.en}
                                <span className="opacity-60">({count})</span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* Projects grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {tabProjects.map((project, index) => {
                            const content = project[lang]
                            return (
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.06 }}
                                >
                                    <Link href={`/projects/${project.slug}`} className="block group">
                                        <div
                                            className="rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.01]"
                                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                                        >
                                            {/* Gradient banner */}
                                            <div className="h-28 relative" style={{ background: project.gradient }}>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                    <span className="text-5xl">{project.emoji}</span>
                                                </div>
                                                {/* Tags */}
                                                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                                {/* Year */}
                                                <div className="absolute top-3 right-3 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>
                                                    {project.year}
                                                </div>
                                                {/* Category badge */}
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="text-[9px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                                                        style={{ background: `${activeTabMeta.color}25`, color: activeTabMeta.color, border: `1px solid ${activeTabMeta.color}40` }}>
                                                        {activeTabMeta.icon}
                                                        {lang === "fr" ? activeTabMeta.fr : activeTabMeta.en}
                                                    </span>
                                                </div>
                                                {/* Arrow */}
                                                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.15)" }}>
                                                    <ArrowUpRight size={13} className="text-white" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                                    <h2 className="font-bold text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}>
                                                        {`${project.name}_`}
                                                    </h2>
                                                    <span className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                                                        style={{ background: `${project.statusColor}20`, color: project.statusColor, fontFamily: "var(--font-mono)" }}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--fg-muted)" }}>
                                                    {content.desc}
                                                </p>
                                                {/* Links */}
                                                <div className="flex items-center gap-2">
                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors"
                                                            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
                                                        >
                                                            <Github size={10} /> GitHub
                                                        </a>
                                                    )}
                                                    {project.live && (
                                                        <a
                                                            href={project.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors"
                                                            style={{ background: "var(--accent)", color: "#fff", fontFamily: "var(--font-mono)" }}
                                                        >
                                                            <ExternalLink size={10} /> Live
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
            <Footer />
        </main>
    )
}
