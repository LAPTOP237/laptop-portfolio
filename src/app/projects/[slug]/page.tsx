"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ExternalLink, CheckCircle, Zap } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary, projects } from "@/lib/data"

export default function ProjectDetailPage() {
    const params = useParams()
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].projects
    const isEngineer = mode === "engineer"

    const project = projects.find((p) => p.slug === params.slug)

    if (!project) {
        return (
            <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
                <Header />
                <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="text-4xl mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
                        404
                    </div>
                    <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>Project not found.</p>
                    <Link href="/projects" className="text-xs px-4 py-2 rounded" style={{ background: "var(--accent)", color: "#fff" }}>
                        Back to projects
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    const content = project[lang]

    // Related projects (exclude current)
    const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <Header />
            <div className="pt-24 pb-16 px-4 md:px-6 max-w-4xl mx-auto">
                {/* Back link */}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs"
                        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
                    >
                        <ArrowLeft size={13} />
                        {t.backToProjects}
                    </Link>
                </motion.div>

                {/* Hero banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl overflow-hidden mb-8"
                    style={{ background: project.gradient, minHeight: "200px", position: "relative" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-8xl">{project.emoji}</span>
                    </div>
                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full" style={{ minHeight: "200px" }}>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <h1
                            className="text-2xl md:text-4xl font-bold text-white mb-1"
                            style={{ fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}
                        >
                            {isEngineer ? `${project.name}_` : project.name}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span
                                className="text-xs px-2 py-0.5 rounded"
                                style={{
                                    background: `${project.statusColor}30`,
                                    color: project.statusColor,
                                    fontFamily: "var(--font-mono)",
                                    border: `1px solid ${project.statusColor}40`,
                                }}
                            >
                                {project.status}
                            </span>
                            <span className="text-xs text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                                {project.year}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Content grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-5 rounded-lg"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h2
                                className="text-xs font-bold tracking-widest mb-3"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                            >
                                {t.overview.toUpperCase()}
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                {content.longDesc}
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="p-5 rounded-lg"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h2
                                className="text-xs font-bold tracking-widest mb-3"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                            >
                                {t.features.toUpperCase()}
                            </h2>
                            <ul className="space-y-2">
                                {content.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                                        <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Challenge */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-5 rounded-lg"
                            style={{
                                background: `linear-gradient(135deg, var(--bg-card) 0%, ${project.statusColor}08 100%)`,
                                border: `1px solid ${project.statusColor}30`,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Zap size={14} style={{ color: project.statusColor }} />
                                <h2
                                    className="text-xs font-bold tracking-widest"
                                    style={{ fontFamily: "var(--font-mono)", color: project.statusColor }}
                                >
                                    {t.challenge.toUpperCase()}
                                </h2>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                {content.challenge}
                            </p>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Tech stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-4 rounded-lg"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h3
                                className="text-xs font-bold tracking-widest mb-3"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                            >
                                TECH_STACK
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="p-4 rounded-lg"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h3
                                className="text-xs font-bold tracking-widest mb-2"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                            >
                                STATUS
                            </h3>
                            <span
                                className="text-sm font-bold"
                                style={{ color: project.statusColor, fontFamily: "var(--font-mono)" }}
                            >
                                {project.status}
                            </span>
                            <div className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                                {project.year}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium"
                                style={{
                                    background: "var(--accent)",
                                    color: "#fff",
                                    fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                                }}
                            >
                                <ExternalLink size={14} />
                                {t.viewProject}
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Related projects */}
                {related.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 pt-8"
                        style={{ borderTop: "1px solid var(--border)" }}
                    >
                        <h2
                            className="text-xs font-bold tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                        >
                            {isEngineer ? "OTHER_PROJECTS" : "OTHER PROJECTS"}
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {related.map((rel) => (
                                <Link key={rel.slug} href={`/projects/${rel.slug}`} className="group block">
                                    <div
                                        className="rounded-lg overflow-hidden transition-all group-hover:scale-[1.01]"
                                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                                    >
                                        <div className="h-20 relative" style={{ background: rel.gradient }}>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                <span className="text-2xl">{rel.emoji}</span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold text-sm" style={{ fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)", color: "var(--fg)" }}>
                                                {rel.name}
                                            </h3>
                                            <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
                                                {rel[lang].desc}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            <Footer />
        </main>
    )
}
