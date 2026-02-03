"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { createNoise2D } from "simplex-noise";

interface NoiseBackgroundProps {
    className?: string;
    opacity?: number;
}

export default function NoiseBackground({
    className = "",
    opacity = 0.15,
}: NoiseBackgroundProps) {
    const [noiseDataUrl, setNoiseDataUrl] = useState<string>("");
    const noise2D = useMemo(() => createNoise2D(), []);

    // Generate static noise texture once on mount
    useEffect(() => {
        const width = 400;
        const height = 400;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        // Single pass noise generation - no animation loop needed
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                const nx = x / 100;
                const ny = y / 100;

                const noise1 = noise2D(nx, ny);
                const noise2 = noise2D(nx * 2, ny * 2) * 0.5;
                const combinedNoise = (noise1 + noise2) / 1.5;
                const value = (combinedNoise + 1) / 2;

                // Cyan color for space theme
                const r = Math.floor(value * 0);
                const g = Math.floor(value * 150);
                const b = Math.floor(value * 220);
                const a = Math.floor(value * 50);

                // Fill 2x2 block for performance
                for (let dy = 0; dy < 2 && y + dy < height; dy++) {
                    for (let dx = 0; dx < 2 && x + dx < width; dx++) {
                        const index = ((y + dy) * width + (x + dx)) * 4;
                        data[index] = r;
                        data[index + 1] = g;
                        data[index + 2] = b;
                        data[index + 3] = a;
                    }
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        setNoiseDataUrl(canvas.toDataURL());
    }, [noise2D]);

    if (!noiseDataUrl) return null;

    return (
        <div
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{
                opacity,
                backgroundImage: `url(${noiseDataUrl})`,
                backgroundRepeat: "repeat",
                backgroundSize: "400px 400px",
            }}
        />
    );
}

// Static noise texture generator for backgrounds (utility function)
export function generateNoiseTexture(
    width: number = 200,
    height: number = 200,
    scale: number = 50
): string {
    const noise2D = createNoise2D();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = (noise2D(x / scale, y / scale) + 1) / 2;
            const index = (y * width + x) * 4;

            // Subtle cyan noise
            data[index] = Math.floor(value * 20);
            data[index + 1] = Math.floor(value * 60);
            data[index + 2] = Math.floor(value * 80);
            data[index + 3] = Math.floor(value * 30);
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}
