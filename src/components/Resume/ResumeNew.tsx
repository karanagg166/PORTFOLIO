"use client";

import { AiOutlineDownload } from "react-icons/ai";
import Particle from "@/components/Particle";

export default function ResumeNew() {
    return (
        <div className="resume-section min-h-screen">
            <Particle />
            <div className="section-container">
                <div className="flex flex-col items-center">
                    <a
                        className="btn-primary mb-8"
                        href="/resume/karan_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AiOutlineDownload />
                        Download CV
                    </a>

                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
                        <iframe
                            src="/resume/karan_resume.pdf"
                            className="w-full"
                            style={{ height: "80vh", minHeight: "600px" }}
                            title="Resume"
                        />
                    </div>

                    <a
                        className="btn-primary mt-8"
                        href="/resume/karan_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AiOutlineDownload />
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    );
}
