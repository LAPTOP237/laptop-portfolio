"use client"

import { motion } from "framer-motion"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

// ── Devicons CDN helper ────────────────────────────────────────────────────
function DevIcon({ name, variant = "original", size = 26, title }: { name: string; variant?: string; size?: number; title?: string }) {
    return (
        <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`}
            alt={title ?? name}
            width={size}
            height={size}
            style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
            onError={(e) => {
                const img = e.currentTarget
                if (!img.src.includes("-plain")) {
                    img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-plain.svg`
                }
            }}
        />
    )
}

// ── Level label helper ─────────────────────────────────────────────────────
function levelLabel(pct: number, lang: string) {
    if (pct >= 90) return lang === "fr" ? "Expert" : "Expert"
    if (pct >= 75) return lang === "fr" ? "Avancé" : "Advanced"
    if (pct >= 55) return lang === "fr" ? "Intermédiaire" : "Intermediate"
    return lang === "fr" ? "Notions" : "Beginner"
}

function levelColor(pct: number) {
    if (pct >= 90) return "#10b981"   // green
    if (pct >= 75) return "#3b82f6"   // blue
    if (pct >= 55) return "#f59e0b"   // amber
    return "#6b7280"                   // gray
}

// ── Tech stack data ────────────────────────────────────────────────────────
const engineerTechGroups = [
    {
        groupName: "Backend",
        color: "#3b82f6",
        techs: [
            { name: "python", variant: "original", label: "Python", tag: "v3.11", pct: 70 },
            // { name: "fastapi", variant: "original", label: "FastAPI", tag: "API", pct: 75 },
            { name: "django", variant: "plain", label: "Django", tag: "ORM", pct: 70 },
            { name: "php", variant: "original", label: "PHP", tag: "v8.1", pct: 90 },
            { name: "laravel", variant: "original", label: "Laravel", tag: "v12", pct: 90 },
            { name: "javascript", variant: "original", label: "JavaScript", tag: "ES2024", pct: 80 },
            // { name: "spring", variant: "original", label: "Spring", tag: "Boot", pct: 55 },
            { name: "nodejs", variant: "original", label: "Node.js", tag: "v20", pct: 65 },
        ],
    },
    {
        groupName: "Frontend",
        color: "#a855f7",
        techs: [
            { name: "react", variant: "original", label: "React", tag: "v18", pct: 65 },
            { name: "nextjs", variant: "original", label: "Next.js", tag: "v15", pct: 40 },
            { name: "typescript", variant: "original", label: "TypeScript", tag: "v5", pct: 65 },
            { name: "javascript", variant: "original", label: "JavaScript", tag: "ES2024", pct: 80 },
            { name: "html5", variant: "original", label: "HTML5", tag: null, pct: 90 },
            { name: "css3", variant: "original", label: "CSS3", tag: null, pct: 90 },
            { name: "tailwindcss", variant: "plain", label: "Tailwind", tag: null, pct: 65 },
            { name: "flutter", variant: "original", label: "Flutter", tag: "Dart", pct: 70 },
        ],
    },
    {
        groupName: "Infrastructure & Données",
        color: "#10b981",
        techs: [
            { name: "mysql", variant: "original", label: "MySQL", tag: "SQL", pct: 85 },
            { name: "postgresql", variant: "original", label: "PostgreSQL", tag: "SQL", pct: 75 },
            { name: "docker", variant: "original", label: "Docker", tag: "Container", pct: 60 },
            { name: "git", variant: "original", label: "Git", tag: "VCS", pct: 70 },
            { name: "mongodb", variant: "original", label: "MongoDB", tag: "NoSQL", pct: 50 },
            { name: "redis", variant: "original", label: "Redis", tag: "Cache", pct: 50 },
            { name: "linux", variant: "original", label: "Linux", tag: "OS", pct: 70 },
        ],
    },
]

const designerTools = [
    { name: "coreldraw", variant: "original", label: "CorelDraw", cat: "Vector", pct: 95 },
    { name: "photoshop", variant: "original", label: "Photoshop", cat: "Photo", pct: 65 },
    { name: "illustrator", variant: "original", label: "Illustrator", cat: "Vector", pct: 65 },
    { name: "figma", variant: "original", label: "Figma", cat: "UI/UX", pct: 65 },
    { name: "xd", variant: "original", label: "Adobe XD", cat: "UI/UX", pct: 70 },
    { name: "lensstudio", variant: "original", label: "SnapChat Lens Studio", cat: "Lens", pct: 55 },
    { name: "capcut", variant: "original", label: "CapCut", cat: "Video", pct: 60 },
    { name: "aftereffects", variant: "original", label: "After Effects", cat: "Motion", pct: 55 },
    { name: "premierepro", variant: "original", label: "Premiere Pro", cat: "Video", pct: 60 },
]

// ── Skill card with progress bar ───────────────────────────────────────────
function SkillCard({
    name, variant, label, tag, pct, groupColor, lang, delay,
}: {
    name: string; variant: string; label: string; tag: string | null; pct: number;
    groupColor: string; lang: string; delay: number;
}) {
    const color = levelColor(pct)
    const lvl = levelLabel(pct, lang)

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
            {/* Icon */}
            <DevIcon name={name} variant={variant} size={26} title={label} />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold truncate" style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}>
                        {label}
                        {tag && <span className="ml-1 text-[9px] opacity-50">{tag}</span>}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                            {lvl}
                        </span>
                        <span className="text-[10px] font-bold tabular-nums" style={{ color, fontFamily: "var(--font-mono)" }}>
                            {pct}%
                        </span>
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
                    />
                </div>
            </div>
        </motion.div>
    )
}

// ── Main component ─────────────────────────────────────────────────────────
export function Skills() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].skills
    const isEngineer = mode === "engineer"

    return (
        <section id="skills" className="py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-xs font-bold tracking-widest mb-1"
                        style={{ fontFamily: "var(--font-mono)", color: isEngineer ? "var(--fg)" : "var(--accent)" }}>
                        {isEngineer ? t.title : t.designTitle}
                    </h2>
                    <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                        {isEngineer
                            ? (lang === "fr" ? "Stack technique — niveau de maîtrise par technologie." : "Tech stack — proficiency level per technology.")
                            : (lang === "fr" ? "Outils créatifs — niveau de maîtrise." : "Creative tools — proficiency level.")}
                    </p>
                </motion.div>

                {isEngineer ? (
                    /* ── ENGINEER: grouped skill cards with progress bars ── */
                    <div className="space-y-8">
                        {engineerTechGroups.map((group, gi) => (
                            <motion.div
                                key={group.groupName}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: gi * 0.06 }}
                            >
                                {/* Group label */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-4 rounded-full" style={{ background: group.color }} />
                                    <span className="text-xs font-bold tracking-widest uppercase"
                                        style={{ color: group.color, fontFamily: "var(--font-mono)" }}>
                                        {group.groupName}
                                    </span>
                                    <span className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                                        ({group.techs.length})
                                    </span>
                                </div>

                                {/* 2-column grid of skill cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {group.techs.map((tech, ti) => (
                                        <SkillCard
                                            key={tech.name}
                                            {...tech}
                                            groupColor={group.color}
                                            lang={lang}
                                            delay={gi * 0.04 + ti * 0.04}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* ── DESIGNER: tool cards with progress bars ── */
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
                            {designerTools.map((tool, ti) => (
                                <SkillCard
                                    key={tool.name}
                                    name={tool.name}
                                    variant={tool.variant}
                                    label={tool.label}
                                    tag={tool.cat}
                                    pct={tool.pct}
                                    groupColor="var(--accent)"
                                    lang={lang}
                                    delay={ti * 0.05}
                                />
                            ))}
                        </div>

                        {/* Design Capabilities */}
                        <div className="pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="max-w-xs">
                                    <h3 className="text-base font-black mb-1.5" style={{ color: "var(--fg)" }}>
                                        DESIGN <span style={{ color: "var(--accent)" }}>CAPABILITIES</span>
                                    </h3>
                                    <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                        {t.designSubtitle}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {t.designCapabilities.map((cap) => (
                                        <div key={cap.num}>
                                            <div className="text-xs font-mono mb-0.5" style={{ color: "var(--accent)" }}>{cap.num}</div>
                                            <div className="text-xs font-bold mb-0.5 tracking-wide" style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}>{cap.title}</div>
                                            <div className="text-xs max-w-[140px]" style={{ color: "var(--fg-muted)" }}>{cap.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
