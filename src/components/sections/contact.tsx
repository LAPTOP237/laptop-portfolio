"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { useMode } from "@/components/provider/mode-provider"
import { useLanguage } from "@/components/provider/language-provider"
import { dictionary } from "@/lib/data"

export function Contact() {
    const { mode } = useMode()
    const { lang } = useLanguage()
    const t = dictionary[lang].contact
    const isEngineer = mode === "engineer"

    const inputStyle = {
        background: "var(--bg)",
        border: "1px solid var(--border)",
        color: "var(--fg)",
        fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
        borderRadius: "6px",
        fontSize: "13px",
    }

    return (
        <section id="contact" className="py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Left: Info */}
                    <div>
                        <h2
                            className="text-xl font-black mb-2"
                            style={{
                                fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                                color: "var(--fg)",
                            }}
                        >
                            {t.title}
                        </h2>
                        <p className="text-xs mb-6 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                            {t.description}
                        </p>

                        <div className="space-y-3 mb-6">
                            {[
                                { icon: <Mail size={14} />, label: "linjouom9@gmail.com", href: "mailto:linjouom9@gmail.com" },
                                { icon: <Phone size={14} />, label: "+237 694 828 353", href: "tel:+237694828353" },
                                { icon: <MapPin size={14} />, label: "Douala, Cameroon", href: "#" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-2.5 text-xs"
                                    style={{ color: "var(--fg-muted)" }}
                                >
                                    <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {[
                                { icon: <Github size={14} />, href: "https://github.com/LAPTOP237" },
                                { icon: <Linkedin size={14} />, href: "https://linkedin.com/in/alain-linjouom" },
                                { icon: <Mail size={14} />, href: "mailto:linjouom9@gmail.com" },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div
                        className="p-5 rounded-lg"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    >
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder={t.placeholders.name} className="w-full px-3 py-2 outline-none" style={inputStyle} />
                                <input type="email" placeholder={t.placeholders.email} className="w-full px-3 py-2 outline-none" style={inputStyle} />
                            </div>
                            <input type="text" placeholder={t.placeholders.subject} className="w-full px-3 py-2 outline-none" style={inputStyle} />
                            <textarea
                                rows={4}
                                placeholder={t.placeholders.message}
                                className="w-full px-3 py-2 outline-none resize-none"
                                style={inputStyle}
                            />
                            <button
                                type="submit"
                                className="w-full py-2.5 text-sm font-medium rounded flex items-center justify-center gap-2"
                                style={{
                                    background: "var(--accent)",
                                    color: "#fff",
                                    fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                                }}
                            >
                                {t.placeholders.send}
                                <Send size={13} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
