"use client"

import { Laptop } from "lucide-react"
import { useMode } from "@/components/provider/mode-provider"

export function Logo() {
    const { mode } = useMode()

    return (
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="p-1.5 bg-primary rounded-lg text-white">
                <Laptop size={20} />
            </div>
            <span className={mode === "engineer" ? "font-mono" : "font-sans"}>
                LINJOUOM
            </span>
        </div>
    )
}
