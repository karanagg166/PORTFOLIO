"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import LottieAnimation to avoid SSR issues
const LottieAnimation = dynamic(
    () => import("@/components/effects/LottieAnimations").then(mod => ({ default: mod.LottieAnimation })),
    { ssr: false }
);

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="preloader" className={isLoading ? "" : "hidden"}>
            <div className="space-preloader">
                <div className="planet-orbit">
                    <div className="planet"></div>
                </div>
                <div className="stars">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                    <div className="star star-4"></div>
                    <div className="star star-5"></div>
                </div>

                {/* Lottie rocket animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LottieAnimation type="rocket" size={50} />
                </div>

                <div className="loading-text">
                    <span className="loading-text-content">Launching...</span>
                </div>
            </div>
        </div>
    );
}
