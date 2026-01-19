"use client";

import dynamic from "next/dynamic";
import { SVGBackground } from "@/components/effects/SVGBackgrounds";

// Dynamic imports for client-side only components
const NoiseBackground = dynamic(
    () => import("@/components/effects/NoiseBackground"),
    { ssr: false }
);

export default function BackgroundEffects() {
    return (
        <>
            {/* Simplex Noise animated nebula background */}
            <NoiseBackground opacity={0.1} speed={0.0003} />

            {/* SVG constellation pattern overlay */}
            <SVGBackground pattern="constellation" opacity={0.3} />
        </>
    );
}
