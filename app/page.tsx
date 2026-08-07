import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import {FloatingNav} from "../components/ui/FloatingNav";
import { navItems } from "@/data";

// Lazy load below-the-fold components
const Grid = dynamic(() => import('@/components/Grid'), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const RecentProject = dynamic(() => import('@/components/RecentProject'), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const TechStack = dynamic(() => import('@/components/TechStack').then(mod => mod.TechStack), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const PhotoWall = dynamic(() => import('@/components/PhotoWall'), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const GitHubPRs = dynamic(() => import('@/components/GitHubPRs'), {
  loading: () => <div className="h-screen" />,
  ssr: true
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32" />,
  ssr: true
});



export default function Home() {
  return (
    
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto overflow-clip w-full">
      <div className="w-full">
       <FloatingNav navItems={navItems}/>
       <Hero/>
       <Grid/>
       <Experience/>
       <RecentProject/>
       <TechStack/>
       <GitHubPRs/>
       <PhotoWall/>
       <Footer/>
      </div>
    </main>
   
  );
}
