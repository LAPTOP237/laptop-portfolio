"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useMode } from "@/components/provider/mode-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
    const { mode } = useMode()
    const isEngineer = mode === "engineer"

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                {/* Glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    {/* 404 */}
                    <div
                        className="text-7xl md:text-9xl font-black mb-4 leading-none"
                        style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--accent)",
                            opacity: 0.15,
                        }}
                    >
                        404
                    </div>

                    <div
                        className="text-2xl md:text-3xl font-bold mb-3 -mt-8"
                        style={{
                            fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                            color: "var(--fg)",
                        }}
                    >
                        {isEngineer ? "ERROR: Page_Not_Found" : "Page introuvable"}
                    </div>

                    <p
                        className="text-sm mb-8 max-w-sm"
                        style={{ color: "var(--fg-muted)" }}
                    >
                        {isEngineer
                            ? "The requested route does not exist in the current build. Check your path and try again."
                            : "La page que vous cherchez n'existe pas ou a été déplacée."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="px-6 py-2.5 rounded text-sm font-medium"
                            style={{
                                background: "var(--accent)",
                                color: "#fff",
                                fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                            }}
                        >
                            {isEngineer ? "cd ~/" : "Retour à l'accueil"}
                        </Link>
                        <Link
                            href="/projects"
                            className="px-6 py-2.5 rounded text-sm font-medium"
                            style={{
                                border: "1px solid var(--border)",
                                color: "var(--fg)",
                                fontFamily: isEngineer ? "var(--font-mono)" : "var(--font-sans)",
                            }}
                        >
                            {isEngineer ? "ls ./projects" : "Voir les projets"}
                        </Link>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    )
}
