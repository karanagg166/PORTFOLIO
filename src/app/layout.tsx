import type { Metadata } from 'next';
import { Inter, Raleway, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import CursorProvider from '@/components/providers/CursorProvider';
import AudioProvider from '@/components/providers/AudioProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import GrainOverlay from '@/components/effects/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import AudioToggle from '@/components/ui/AudioToggle';
import EasterEggHunt from '@/components/ui/EasterEggHunt';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Pre';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-raleway' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Karan Aggarwal | Software Engineer',
  description: 'Portfolio of Karan Aggarwal. Full Stack Developer, Problem Solver.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${raleway.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
    <body className="antialiased bg-deep-space text-white overflow-x-hidden selection:bg-accent-purple/30 selection:text-cyan-300 min-h-screen flex flex-col">
        <Preloader />
        <SmoothScroll>
          <AudioProvider />
          <CursorProvider />
          
          <GrainOverlay />
          <ScrollProgress />
          <AudioToggle />
          <EasterEggHunt />
          
          <Navbar />
          
          <main className="relative z-10 w-full flex-1">
            {children}
          </main>
          
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
