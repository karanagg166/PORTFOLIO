"use client";

import { useEffect, useRef, useMemo } from "react";
import { createNoise2D } from "simplex-noise";

interface NoiseBackgroundProps {
    className?: string;
    opacity?: number;
    speed?: number;
}

export default function NoiseBackground({
    className = "",
    opacity = 0.15,
    speed = 0.0005
}: NoiseBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const noise2D = useMemo(() => createNoise2D(), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const animate = () => {
            time += speed;

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            // Create nebula-like noise pattern
            for (let y = 0; y < canvas.height; y += 4) {
                for (let x = 0; x < canvas.width; x += 4) {
                    // Multiple octaves of noise for more interesting patterns
                    const nx = x / 200;
                    const ny = y / 200;

                    const noise1 = noise2D(nx + time, ny + time);
                    const noise2 = noise2D(nx * 2 + time * 0.5, ny * 2) * 0.5;
                    const noise3 = noise2D(nx * 4, ny * 4 + time * 0.3) * 0.25;

                    const combinedNoise = (noise1 + noise2 + noise3) / 1.75;
                    const value = (combinedNoise + 1) / 2; // Normalize to 0-1

                    // Cyan color for space theme
                    const r = Math.floor(value * 0);
                    const g = Math.floor(value * 180);
                    const b = Math.floor(value * 255);
                    const a = Math.floor(value * 60);

                    // Fill 4x4 block for performance
                    for (let dy = 0; dy < 4 && y + dy < canvas.height; dy++) {
                        for (let dx = 0; dx < 4 && x + dx < canvas.width; dx++) {
                            const index = ((y + dy) * canvas.width + (x + dx)) * 4;
                            data[index] = r;
                            data[index + 1] = g;
                            data[index + 2] = b;
                            data[index + 3] = a;
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [noise2D, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{ opacity }}
        />
    );
}

// Static noise texture generator for backgrounds
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
