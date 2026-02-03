"use client";

import dynamic from "next/dynamic";
import Particle from "@/components/Particle";

// Dynamic import for Contact component with ssr: false
const Contact = dynamic(() => import("@/components/Contact/Contact"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    ),
});

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <Particle />
            <Contact />
        </div>
    );
}
