"use client"
import React from 'react'
import { LayoutGridDemo } from './ui/Layoutuse'

import { TypewriterEffectSmooth } from './ui/type-writer-effect'
import {MagicButton} from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'


const words= [
    {   
        id:1,
        text: "My",
    },
    {   
        id:2,
        text: "top",
    },
    {   
        id:3,
        text: "photography ",
    },
    {   
        id:4,
        text: "shots",
    },
]

const PhotoWall = () => {
       
   
    
  return (
    <section id='photowall'>
    <div className='h-full w-full flex flex-col relative justify-start items-center'>
        
        <TypewriterEffectSmooth words={words} />

        <a href='https://www.instagram.com/karanagg166/' target='_blank' rel='noreferrer'> <MagicButton title='Photography Account' icon={<FaLocationArrow/>} position='right'/></a>
        
        <div className='mt-10 mb-10  rounded-xl bg-lime-200 w-[600px] hidden md:block lg-block  h-2'></div>
      
        
        <LayoutGridDemo />

       
        
       
       

    </div>
    </section>
  )
}

export default PhotoWall