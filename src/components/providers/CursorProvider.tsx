"use client";

import dynamic from "next/dynamic";

// Dynamic import for CustomCursor - client-side only
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
    ssr: false,
});

export default function CursorProvider() {
    return <CustomCursor />;
}
