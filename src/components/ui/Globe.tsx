"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const GlobeComponent = dynamic(() => import("./GlobeClient"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    ),
});

export default function Globe() {
    return <GlobeComponent />;
}
