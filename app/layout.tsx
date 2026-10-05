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
  title: "Portfolio",
  description: "Full Stack Developer, AI Engineer & Competitive Programmer | B.Tech CSE at IIITDM Jabalpur",
  metadataBase: new URL('https://portfolio-kappa-bay-76.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-kappa-bay-76.vercel.app',
    title: "Portfolio",
    description: 'Computer Science Undergrad at IIITDM Jabalpur. Full Stack Developer & Competitive Programmer.',
    siteName: "Portfolio",
    images: [{ url: '/favicon-512x512.png', width: 512, height: 512, alt: 'Portfolio' }],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
