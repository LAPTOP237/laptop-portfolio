"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Github, Linkedin, Download, ArrowRight, GraduationCap, Star } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

export default function AboutPage() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].about
    const isEngineer = mode === "engineer"

    const fontHeading = isEngineer ? "var(--font-mono)" : "var(--font-sans)"

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <Header />
            <div className="pt-24 pb-12 px-4 md:px-6 max-w-5xl mx-auto">

                {/* ── Hero block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-6 mb-10"
                >
                    {/* Avatar card */}
                    <div
                        className="md:col-span-1 rounded-xl p-6 flex flex-col items-center text-center"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    >
                        {/* Profile photo */}
                        <div
                            className="relative w-24 h-24 mb-4 overflow-hidden"
                            style={{
                                borderRadius: isEngineer ? "10px" : "50%",
                                border: "2px solid var(--accent)",
                                boxShadow: "0 0 0 4px var(--bg-card), 0 0 0 6px var(--accent)",
                            }}
                        >
                            <Image
                                src="/maphoto.jpg"
                                alt="Alain Pascal LINJOUOM"
                                fill
                                className="object-cover object-top"
                                sizes="96px"
                            />
                        </div>
                        <h1 className="font-black text-base mb-0.5" style={{ fontFamily: fontHeading, color: "var(--fg)" }}>
                            Alain Pascal LINJOUOM
                        </h1>
                        <p className="text-xs mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                            {t.role}
                        </p>
                        <p className="text-xs mb-4" style={{ color: "var(--fg-muted)" }}>{t.school}</p>

                        {/* Contact info */}
                        <div className="w-full space-y-2 mb-4">
                            {[
                                { icon: <Mail size={12} />, label: "linjouom9@gmail.com", href: "mailto:linjouom9@gmail.com" },
                                { icon: <Phone size={12} />, label: "+237 694 828 353", href: "tel:+237694828353" },
                                { icon: <MapPin size={12} />, label: "Douala, Cameroun", href: "#" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-2 text-xs w-full"
                                    style={{ color: "var(--fg-muted)" }}
                                >
                                    <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                                    <span className="truncate">{item.label}</span>
                                </a>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex gap-2 mb-4">
                            {[
                                { icon: <Github size={13} />, href: "https://github.com/LAPTOP237", label: "GitHub" },
                                { icon: <Linkedin size={13} />, href: "https://linkedin.com/in/alain-linjouom-302211211", label: "LinkedIn" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded"
                                    style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                                    title={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* CTAs */}
                        <a
                            href="/cv.pdf"
                            download
                            className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-medium mb-2"
                            style={{ background: "var(--accent)", color: "#fff", fontFamily: fontHeading }}
                        >
                            <Download size={12} />
                            {t.downloadCv}
                        </a>
                        <Link
                            href="/#contact"
                            className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-medium"
                            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}
                        >
                            <Mail size={12} />
                            {t.contactMe}
                        </Link>
                    </div>

                    {/* Bio + skills */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-5 rounded-xl"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h2
                                className="text-xs font-bold tracking-widest mb-3"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                            >
                                {isEngineer ? "// BIO" : "BIO"}
                            </h2>
                            {t.bio.split("\n\n").map((para, i) => (
                                <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: "var(--fg-muted)" }}>
                                    {para}
                                </p>
                            ))}
                        </motion.div>

                        {/* Tech skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="p-5 rounded-xl"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                        >
                            <h2
                                className="text-xs font-bold tracking-widest mb-4"
                                style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                            >
                                {isEngineer ? "// TECH_SKILLS" : "COMPÉTENCES"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {t.techSkills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs" style={{ color: "var(--fg)", fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)" }}>
                                                {skill.name}
                                            </span>
                                            <span className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="h-full rounded-full"
                                                style={{ background: "var(--accent)" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Education ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2
                        className="text-xs font-bold tracking-widest mb-5"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}
                    >
                        {isEngineer ? `// ${t.education.toUpperCase()}` : t.education.toUpperCase()}
                    </h2>
                    <div className="space-y-3">
                        {t.educationItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="flex gap-4 p-4 rounded-lg"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    <GraduationCap size={16} style={{ color: "var(--accent)" }} />
                                </div>
                                <div>
                                    <div className="text-xs mb-0.5" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                                        {item.year}
                                    </div>
                                    <div className="text-sm font-bold" style={{ color: "var(--fg)", fontFamily: fontHeading }}>
                                        {item.degree}
                                    </div>
                                    <div className="text-xs" style={{ color: "var(--fg-muted)" }}>{item.school}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Interests ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2
                        className="text-xs font-bold tracking-widest mb-4"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }}
                    >
                        {isEngineer ? `// ${t.interests.toUpperCase()}` : t.interests.toUpperCase()}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {t.interestItems.map((interest) => (
                            <span
                                key={interest}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                            >
                                <Star size={10} style={{ color: "var(--accent)" }} />
                                {interest}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl text-center"
                    style={{
                        background: `linear-gradient(135deg, var(--bg-card) 0%, color-mix(in srgb, var(--accent) 8%, var(--bg-card)) 100%)`,
                        border: "1px solid var(--border)",
                    }}
                >
                    <h3 className="font-black text-lg mb-2" style={{ fontFamily: fontHeading, color: "var(--fg)" }}>
                        {isEngineer ? "Ready to collaborate?" : "Travaillons ensemble"}
                    </h3>
                    <p className="text-xs mb-4" style={{ color: "var(--fg-muted)" }}>
                        {isEngineer
                            ? "Open to freelance missions, internships and full-time opportunities."
                            : "Ouvert aux missions freelance, stages et opportunités à temps plein."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/#contact"
                            className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium"
                            style={{ background: "var(--accent)", color: "#fff", fontFamily: fontHeading }}
                        >
                            {isEngineer ? "contact.me.init()" : "Me contacter"}
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            href={isEngineer ? "/projects" : "/design"}
                            className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium"
                            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}
                        >
                            {isEngineer ? "ls ./projects" : "Voir mes créations"}
                        </Link>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    )
}
