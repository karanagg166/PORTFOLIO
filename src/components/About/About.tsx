"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Particle from "@/components/Particle";
import AboutCard from "./AboutCard";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Github from "./Github";
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn } from "@/components/ui/AnimatedSection";

// Dynamic imports for heavy components
const Globe = dynamic(() => import("@/components/ui/Globe"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    ),
});

const SkillChart = dynamic(() => import("@/components/ui/SkillChart"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-cyan-500">Loading chart...</div>
        </div>
    ),
});

export default function About() {
    return (
        <div className="about-section min-h-screen">
            <Particle />
            <div className="section-container">
                {/* About Me Section */}
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <FadeInLeft className="md:col-span-7">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6">
                            Know Who <strong className="purple">I&apos;M</strong>
                        </h1>
                        <AboutCard />
                    </FadeInLeft>
                    <FadeInRight className="md:col-span-5 flex justify-center">
                        <Image
                            src="/images/karan-photo.jpeg"
                            alt="about"
                            width={350}
                            height={350}
                            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                            style={{ maxHeight: "450px", objectFit: "cover" }}
                        />
                    </FadeInRight>
                </div>

                {/* 3D Globe - Global Reach */}
                <FadeInUp className="mt-16">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        <strong className="purple">Global</strong> Reach
                    </h1>
                    <div className="flex justify-center">
                        <Globe />
                    </div>
                </FadeInUp>

                {/* Skill Chart */}
                <FadeInUp className="mt-16">
                    <SkillChart />
                </FadeInUp>

                {/* Professional Skillset */}
                <FadeInUp className="mt-16">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Professional <strong className="purple">Skillset</strong>
                    </h1>
                    <Techstack />
                </FadeInUp>

                {/* Tools */}
                <FadeInUp className="mt-16">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        <strong className="purple">Tools</strong> I use
                    </h1>
                    <Toolstack />
                </FadeInUp>

                {/* GitHub Activity */}
                <ScaleIn className="mt-16">
                    <Github />
                </ScaleIn>
            </div>
        </div>
    );
}
