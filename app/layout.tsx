import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import dynamic from 'next/dynamic';
const Balatro = dynamic(() => import('../components/Balatro'), { ssr: false });


const font = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-jakarta',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Karan Aggarwal's Portfolio",
  description: "Full Stack Developer, AI Engineer & Competitive Programmer | B.Tech CSE at IIITDM Jabalpur",
  metadataBase: new URL('https://portfolio-kappa-bay-76.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-kappa-bay-76.vercel.app',
    title: "Karan Aggarwal's Portfolio",
    description: 'Computer Science Undergrad at IIITDM Jabalpur. Full Stack Developer & Competitive Programmer.',
    siteName: "Karan Aggarwal's Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
            <div className="relative z-10">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
