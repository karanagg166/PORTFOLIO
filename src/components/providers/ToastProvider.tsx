"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "rgba(5, 10, 20, 0.95)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                    color: "#ffffff",
                    backdropFilter: "blur(10px)",
                },
                className: "toast-notification",
            }}
            theme="dark"
            richColors
            closeButton
        />
    );
}

// Export toast function for use anywhere
export { toast } from "sonner";
