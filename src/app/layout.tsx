import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Pre";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { ToastProvider } from "@/components/providers/ToastProvider";
import BackgroundEffects from "@/components/effects/BackgroundEffects";

const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-raleway",
});

export const metadata: Metadata = {
    title: "Karan Aggarwal | Portfolio",
    description: "Personal portfolio of Karan Aggarwal - Full Stack Developer, MERN Stack Developer, and Open Source Contributor",
    keywords: ["Karan Aggarwal", "Portfolio", "Full Stack Developer", "MERN Stack", "React", "Next.js"],
    authors: [{ name: "Karan Aggarwal" }],
    openGraph: {
        title: "Karan Aggarwal | Portfolio",
        description: "Personal portfolio of Karan Aggarwal - Full Stack Developer",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${raleway.variable} dark`} suppressHydrationWarning>
            <body className="antialiased bg-black text-white">
                <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
                    <SmoothScroll>
                        {/* Background effects (NoiseBackground + SVGBackground) */}
                        <BackgroundEffects />

                        <Preloader />
                        <div className="App relative z-10" id="scroll">
                            <div className="particle-background"></div>
                            <Navbar />
                            {children}
                            <Footer />
                        </div>
                        <ToastProvider />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
