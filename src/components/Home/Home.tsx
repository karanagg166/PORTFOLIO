"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Particle from "@/components/Particle";
import Type from "./Type";
import Home2 from "./Home2";
import { GSAPFadeIn, MagneticButton } from "@/components/animations/GSAPAnimations";
import { ScrollReveal } from "@/components/animations/ScrollAnimations";
import { SpringReveal, SpringButton } from "@/components/animations/SpringAnimations";

// Dynamic import for 3D Globe to avoid SSR issues
const GlobeClient = dynamic(() => import("@/components/ui/GlobeClient"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    ),
});

export default function Home() {
    return (
        <section>
            <div className="home-section min-h-screen">
                <Particle />
                <div className="section-container">
                    <div className="home-content grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7">
                            {/* SpringReveal for heading */}
                            <SpringReveal direction="up" delay={200}>
                                <h1 className="heading">
                                    Hi There!{" "}
                                    <span className="wave inline-block animate-pulse">👋🏻</span>
                                </h1>
                            </SpringReveal>

                            {/* SpringReveal from left for name */}
                            <SpringReveal direction="left" delay={400}>
                                <h1 className="heading-name mt-4">
                                    I&apos;M
                                    <strong className="main-name"> Karan Aggarwal</strong>
                                </h1>
                            </SpringReveal>

                            <GSAPFadeIn direction="up" delay={0.6}>
                                <div className="mt-12">
                                    <Type />
                                </div>
                            </GSAPFadeIn>

                            {/* SpringButton for CTA */}
                            <SpringReveal direction="up" delay={800}>
                                <div className="mt-8 flex gap-4">
                                    <SpringButton
                                        className="glow-btn"
                                        onClick={() => window.open("/resume", "_self")}
                                    >
                                        View Resume
                                    </SpringButton>
                                    <SpringButton
                                        className="glow-btn"
                                        onClick={() => window.open("/project", "_self")}
                                    >
                                        See Projects
                                    </SpringButton>
                                </div>
                            </SpringReveal>
                        </div>

                        <div className="md:col-span-5">
                            {/* Avatar for desktop */}
                            <ScrollReveal>
                                <div className="hidden md:flex justify-center">
                                    <MagneticButton>
                                        <div className="relative">
                                            <Image
                                                src="/images/karan-photo.jpeg"
                                                alt="Karan Aggarwal"
                                                width={320}
                                                height={320}
                                                className="rounded-full border-4 border-cyan-500/30 shadow-[0_0_60px_rgba(0,212,255,0.3)] hover:border-cyan-400 hover:shadow-[0_0_80px_rgba(0,212,255,0.5)] transition-all duration-300"
                                                priority
                                            />
                                            {/* Glow ring effect */}
                                            <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-pulse" />
                                            <div className="absolute -inset-8 rounded-full border border-cyan-500/10" />
                                        </div>
                                    </MagneticButton>
                                </div>
                            </ScrollReveal>

                            {/* Avatar for mobile */}
                            <GSAPFadeIn direction="right" delay={0.8}>
                                <div className="flex justify-center md:hidden">
                                    <Image
                                        src="/images/karan-photo.jpeg"
                                        alt="Karan Aggarwal"
                                        width={250}
                                        height={250}
                                        className="rounded-full border-4 border-cyan-500/30 shadow-[0_0_40px_rgba(0,212,255,0.3)]"
                                        priority
                                    />
                                </div>
                            </GSAPFadeIn>
                        </div>
                    </div>

                    {/* 3D Globe Section */}
                    <ScrollReveal>
                        <div className="mt-20 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                <span className="purple">Global</span> Connections
                            </h2>
                            <p className="text-gray-400 mb-8">Building software that connects the world</p>
                            <div className="flex justify-center">
                                <GlobeClient />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
            <Home2 />
        </section>
    );
}
