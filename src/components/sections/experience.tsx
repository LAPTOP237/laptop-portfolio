"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

// ── Single timeline item ───────────────────────────────────────────────────
function TimelineItem({
    item,
    index,
    isEngineer,
}: {
    item: { year: string; role: string; company: string; companyColor: string; description: string[] }
    index: number
    isEngineer: boolean
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, ease: "easeOut" }}
            className="relative pl-6"
            style={{ borderLeft: "2px solid var(--border)" }}
        >
            {/* Dot */}
            <div
                className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{
                    background: item.companyColor,
                    boxShadow: `0 0 0 3px var(--bg), 0 0 0 5px ${item.companyColor}50`,
                }}
            />

            {/* Year badge */}
            <div className="mb-1.5">
                <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                        background: `${item.companyColor}18`,
                        color: item.companyColor,
                        fontFamily: "var(--font-mono)",
                        border: `1px solid ${item.companyColor}30`,
                    }}
                >
                    {item.year}
                </span>
            </div>

            {/* Role + Company */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
                <h3
                    className="font-bold text-sm"
                    style={{
                        fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                        color: "var(--fg)",
                    }}
                >
                    {item.role}
                </h3>
                <span
                    className="text-xs font-medium"
                    style={{ color: item.companyColor, fontFamily: "var(--font-mono)" }}
                >
                    @ {item.company}
                </span>
            </div>

            {/* Description bullets */}
            <ul className="space-y-1 mb-6">
                {item.description.map((point, i) => (
                    <li
                        key={i}
                        className="text-xs flex items-start gap-2 leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                    >
                        <span style={{ color: item.companyColor, marginTop: "2px", flexShrink: 0 }}>›</span>
                        {point}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

// ── Timeline section block ─────────────────────────────────────────────────
function TimelineBlock({
    title,
    icon,
    color,
    items,
    isEngineer,
    delay = 0,
}: {
    title: string
    icon: React.ReactNode
    color: string
    items: { year: string; role: string; company: string; companyColor: string; description: string[] }[]
    isEngineer: boolean
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, ease: "easeOut" }}
        >
            {/* Block header */}
            <div className="flex items-center gap-2.5 mb-6">
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                    <span style={{ color }}>{icon}</span>
                </div>
                <h2
                    className="text-xs font-bold tracking-widest"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}
                >
                    {title}
                </h2>
            </div>

            {/* Timeline items */}
            <div>
                {items.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} isEngineer={isEngineer} />
                ))}
            </div>
        </motion.div>
    )
}

// ── Main component ─────────────────────────────────────────────────────────
export function Experience() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].experience
    const isEngineer = mode === "engineer"

    return (
        <section id="roadmap" className="py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Two-column layout on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    {/* ── Expérience Professionnelle ── */}
                    <TimelineBlock
                        title={t.title}
                        icon={<Briefcase size={14} />}
                        color="#3b82f6"
                        items={t.jobs}
                        isEngineer={isEngineer}
                        delay={0}
                    />

                    {/* ── Formation ── */}
                    <TimelineBlock
                        title={t.formationTitle}
                        icon={<GraduationCap size={14} />}
                        color="#a855f7"
                        items={t.education}
                        isEngineer={isEngineer}
                        delay={0.1}
                    />
                </div>
            </div>
        </section>
    )
}
