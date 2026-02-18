"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary, projects } from "@/lib/data"
import { ArrowUpRight, ArrowRight } from "lucide-react"

// ── Featured design works to preview on home page (designer mode) ──────────
const featuredDesigns = [
    { id: "d1", name: "App Cantiques en Bamoun", nameFr: "App Cantiques en Bamoun", image: "/design/UI UX DESIGN/App cantiques en bamoun.png", cat: "UI/UX" },
    { id: "d2", name: "Ecolink — Eco App", nameFr: "Ecolink — App Écologique", image: "/design/UI UX DESIGN/ecolink - app ecologique.png", cat: "UI/UX" },
    { id: "d3", name: "SIE 2026 — Gala Flyer", nameFr: "SIE 2026 — Gala Flyer", image: "/design/sie/GALA Flyer.png", cat: "SIE 2026" },
    { id: "d4", name: "GWELAMAR SPA — Logo", nameFr: "GWELAMAR SPA — Logo", image: "/design/logos/Logo GWELAMAR SPA.png", cat: "LOGOS" },
    { id: "d5", name: "Canton Fair 2025", nameFr: "Canton Fair 2025", image: "/design/CANTON FAIR 2025.png", cat: "AFFICHES" },
    { id: "d6", name: "Mon Compagnon — App", nameFr: "Mon Compagnon — App", image: "/design/UI UX DESIGN/Mon compagnon - app d'aide etudiant.png", cat: "UI/UX" },
]

export function Projects() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].projects
    const isEngineer = mode === "engineer"

    // ── ENGINEER MODE — show 3 featured projects ───────────────
    if (isEngineer) {
        const featured = projects.filter(p => p.category === "professional").slice(0, 3)
        return (
            <section id="projects" className="py-12 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-6"
                    >
                        <h2 className="text-xs font-bold tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}>
                            {t.title}
                        </h2>
                        <Link href="/projects" className="text-xs transition-colors" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                            {t.viewAll}
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {featured.map((project, index) => {
                            const content = project[lang]
                            return (
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <Link href={`/projects/${project.slug}`} className="block group">
                                        <div className="rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.01]" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                                            {/* Gradient banner */}
                                            <div className="h-28 relative" style={{ background: project.gradient }}>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                    <span className="text-3xl">{project.emoji}</span>
                                                </div>
                                                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                                                    {project.tags.slice(0, 2).map((tag) => (
                                                        <span key={tag} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.15)" }}>
                                                    <ArrowUpRight size={11} className="text-white" />
                                                </div>
                                            </div>
                                            {/* Card body */}
                                            <div className="p-3">
                                                <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}>
                                                    {`${project.name}_`}
                                                </h3>
                                                <p className="text-xs mb-2.5 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                                    {content.desc}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs" style={{ color: project.statusColor, fontFamily: "var(--font-mono)" }}>
                                                        #{project.status.toLowerCase().replace(" ", "_")}
                                                    </span>
                                                    <span className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                                                        git clone →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }

    // ── DESIGNER MODE — show featured design works, link to /design ─────────
    return (
        <section id="projects" className="py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-6"
                >
                    <div>
                        <h2 className="text-xs font-bold tracking-widest mb-0.5" style={{ fontFamily: "var(--font-sans)", color: "var(--fg)" }}>
                            {lang === "fr" ? "TRAVAUX SÉLECTIONNÉS" : "FEATURED WORK"}
                        </h2>
                        <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                            {lang === "fr" ? "Un aperçu de mes réalisations graphiques" : "A glimpse of my graphic design work"}
                        </p>
                    </div>
                    <Link
                        href="/design"
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
                        style={{ color: "var(--accent)", border: "1px solid var(--accent)", fontFamily: "var(--font-sans)" }}
                    >
                        {lang === "fr" ? "Voir tout" : "View all"}
                        <ArrowRight size={11} />
                    </Link>
                </motion.div>

                {/* Masonry-style grid of real design images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {featuredDesigns.map((work, index) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                        >
                            <Link href="/design" className="block group">
                                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                                    {/* Image */}
                                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                                        <Image
                                            src={work.image}
                                            alt={lang === "fr" ? work.nameFr : work.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 50vw, 33vw"
                                        />
                                        {/* Hover overlay */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2"
                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }}
                                        >
                                            <div className="w-full flex items-end justify-between">
                                                <span className="text-white text-[10px] font-bold leading-tight flex-1 mr-1">
                                                    {lang === "fr" ? work.nameFr : work.name}
                                                </span>
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                                                    <ArrowUpRight size={10} className="text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Category badge */}
                                        <div className="absolute top-1.5 left-1.5">
                                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)" }}>
                                                {work.cat}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Name */}
                                    <div className="px-2.5 py-2" style={{ background: "var(--bg-card)" }}>
                                        <p className="text-[11px] font-semibold truncate" style={{ color: "var(--fg)" }}>
                                            {lang === "fr" ? work.nameFr : work.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA to full gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-6 text-center"
                >
                    <Link
                        href="/design"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:gap-3"
                        style={{ background: "var(--accent)", color: "#fff" }}
                    >
                        {lang === "fr" ? "Voir toutes mes réalisations" : "View all my work"}
                        <ArrowUpRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
