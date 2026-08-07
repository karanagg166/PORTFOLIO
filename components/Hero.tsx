"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import {MagicButton} from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import {FlipWords} from './ui/FlipWords'
import Image from 'next/image'

// Lazy load heavy 3D components
const Spotlight = dynamic(() => import('./ui/Spotlight').then(mod => ({ default: mod.Spotlight })), {
  ssr: false
});


const images = [
  '/images/karan-photo.jpeg',
  '/images/karan.jpeg',
]

const Hero = () => {

  const [selectedImage, setSelectedImage] = React.useState('')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const randomIndex = Math.floor(Math.random() * images.length)
    setSelectedImage(images[randomIndex])
  }, [])

  return (
   
    <div className='pb-20 pt-36 flex items-center justify-center relative overflow-hidden w-full min-h-screen'>
      
      {mounted && (
        <>
          <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white'/>
          <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple'/>
          <Spotlight className='top-28 left-80 h-[80vh] w-[50vw] ' fill='blue'/>
        </>
      )}
     
      <div className="absolute inset-0 w-full h-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 w-full h-full flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        </div>
      </div>
      
      <div className='flex flex-col-reverse lg:flex-row items-center justify-between z-10 relative w-full px-5 md:px-10 lg:px-20 gap-8 lg:gap-12'>
        
        <div className='flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2 lg:flex-1'>
            <h2 className='uppercase tracking-widest text-xs text-blue-100 max-w-full text-center lg:text-left mb-4' >
              Transforming Concepts into Seamless Experiences
            </h2>
            
            <div className="text-center lg:text-left">
              <TextGenerateEffect words={`Hi, I'm Karan Aggarwal`} className='text-[40px] md:text-5xl lg:text-6xl font-bold leading-tight'/>
            </div>
          
            <div className="mt-4 mb-6 h-20 md:h-24"> 
              <FlipWords 
                words={['Full Stack Developer', 'Competitive Programmer', 'AI & Backend Engineer', 'Tech Explorer']} 
                duration={2000}  
                className='text-[30px] md:text-5xl lg:text-5xl text-purple font-bold'
              />
            </div>
            
            <p className='text-center lg:text-left md:tracking-wider mb-8 text-sm md:text-lg lg:text-xl text-white-200 max-w-full'>
              Computer Science Undergrad at IIITDM Jabalpur • Based in Faridabad, Haryana.<br/>
              Building scalable full-stack applications and exploring high-performance systems.
            </p>

            <a href='#projects' className='w-full flex justify-center lg:justify-start'>
              <MagicButton title='Explore My Work' icon={<FaLocationArrow/>} position='right'/>
            </a>
        </div>

        <div className='relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] mb-10 lg:mb-0 flex-shrink-0'>
           {selectedImage && (
             <Image 
               src={selectedImage} 
               alt="Karan Aggarwal"
               fill
               sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
               className='rounded-full object-cover border-4 border-purple/50 shadow-2xl shadow-purple/20 bg-slate-900/50 p-4'
               priority
               quality={85}
               loading="eager"
             />
           )}
        </div>
   
      </div>
    </div>
  )
}

export default Hero
