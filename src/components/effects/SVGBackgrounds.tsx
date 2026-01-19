"use client";

import svgToMiniDataURI from "mini-svg-data-uri";

// Generate optimized SVG data URIs for backgrounds
export const svgBackgrounds = {
    // Grid pattern
    grid: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <path d="M60 0 L60 60 M0 60 L60 60" fill="none" stroke="rgba(0,212,255,0.05)" stroke-width="1"/>
    </svg>
  `),

    // Dot pattern
    dots: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="1" fill="rgba(0,212,255,0.1)"/>
    </svg>
  `),

    // Star pattern
    stars: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="10" cy="20" r="1" fill="rgba(255,255,255,0.3)"/>
      <circle cx="30" cy="80" r="0.5" fill="rgba(255,255,255,0.5)"/>
      <circle cx="50" cy="40" r="1.5" fill="rgba(0,212,255,0.4)"/>
      <circle cx="70" cy="10" r="0.8" fill="rgba(255,255,255,0.4)"/>
      <circle cx="90" cy="60" r="1" fill="rgba(255,255,255,0.3)"/>
      <circle cx="25" cy="50" r="0.6" fill="rgba(255,255,255,0.2)"/>
      <circle cx="75" cy="85" r="1.2" fill="rgba(0,212,255,0.3)"/>
    </svg>
  `),

    // Hexagon pattern
    hexagons: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="100" viewBox="0 0 56 100">
      <path d="M28 0 L56 25 L56 75 L28 100 L0 75 L0 25 Z" 
            fill="none" stroke="rgba(0,212,255,0.03)" stroke-width="1"/>
    </svg>
  `),

    // Circuit pattern
    circuit: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <path d="M0 40 L30 40 L40 30 L50 30" fill="none" stroke="rgba(0,212,255,0.08)" stroke-width="1"/>
      <path d="M40 0 L40 20 L30 30 L30 50" fill="none" stroke="rgba(0,212,255,0.08)" stroke-width="1"/>
      <circle cx="40" cy="40" r="3" fill="rgba(0,212,255,0.1)"/>
      <circle cx="30" cy="30" r="2" fill="rgba(0,212,255,0.08)"/>
    </svg>
  `),

    // Constellation pattern
    constellation: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <circle cx="20" cy="30" r="2" fill="rgba(255,255,255,0.4)"/>
      <circle cx="60" cy="20" r="1.5" fill="rgba(0,212,255,0.5)"/>
      <circle cx="100" cy="40" r="2" fill="rgba(255,255,255,0.3)"/>
      <circle cx="80" cy="80" r="1.5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="40" cy="90" r="2" fill="rgba(0,212,255,0.4)"/>
      <line x1="20" y1="30" x2="60" y2="20" stroke="rgba(0,212,255,0.1)" stroke-width="0.5"/>
      <line x1="60" y1="20" x2="100" y2="40" stroke="rgba(0,212,255,0.1)" stroke-width="0.5"/>
      <line x1="100" y1="40" x2="80" y2="80" stroke="rgba(0,212,255,0.1)" stroke-width="0.5"/>
      <line x1="80" y1="80" x2="40" y2="90" stroke="rgba(0,212,255,0.1)" stroke-width="0.5"/>
    </svg>
  `),
};

// SVG Background Component
interface SVGBackgroundProps {
    pattern: keyof typeof svgBackgrounds;
    className?: string;
    opacity?: number;
}

export function SVGBackground({
    pattern,
    className = "",
    opacity = 1
}: SVGBackgroundProps) {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `url("${svgBackgrounds[pattern]}")`,
                backgroundRepeat: "repeat",
                opacity,
            }}
        />
    );
}

// Generate custom SVG icon as data URI
export function createIconDataURI(svgContent: string): string {
    return svgToMiniDataURI(svgContent);
}

// Pre-made icons as data URIs
export const svgIcons = {
    rocket: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  `),

    code: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  `),

    star: svgToMiniDataURI(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00d4ff">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `),
};

// CSS styles using SVG backgrounds
export const svgBackgroundStyles = {
    grid: {
        backgroundImage: `url("${svgBackgrounds.grid}")`,
        backgroundRepeat: "repeat",
    },
    dots: {
        backgroundImage: `url("${svgBackgrounds.dots}")`,
        backgroundRepeat: "repeat",
    },
    stars: {
        backgroundImage: `url("${svgBackgrounds.stars}")`,
        backgroundRepeat: "repeat",
    },
    constellation: {
        backgroundImage: `url("${svgBackgrounds.constellation}")`,
        backgroundRepeat: "repeat",
    },
    circuit: {
        backgroundImage: `url("${svgBackgrounds.circuit}")`,
        backgroundRepeat: "repeat",
    },
};
