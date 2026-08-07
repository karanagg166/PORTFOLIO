import React from 'react'
import { MagicButton } from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { socialMedia } from '@/data'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='w-full pt-20 pb-10' id='contact'>
       
       <div className='flex flex-col items-center '>
        <h1 className='heading lg:max-w-[45vw] text-center text-3xl md:text-5xl font-bold'>
          Ready to take <span className='text-purple'>your</span> digital presence to the next level?
        </h1>
        <p className='text-white-200 md:mt-10 my-5 text-center max-w-2xl'>
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href='mailto:aggarwalkaran241@gmail.com'> 
            <MagicButton title='Let&apos;s get in touch' icon={<FaLocationArrow/> } position='right'/>
        </a>
       </div>
       <div className='flex mt-16 md:flex-row flex-col justify-between items-center w-full px-10'>
        <p className='md:text-base text-sm md:font-normal font-light text-white-200'>
          Copyright © {new Date().getFullYear()} Karan Aggarwal
        </p>
        <div className='flex items-center md:gap-3 gap-6 mt-4 md:mt-0'>
          {socialMedia.map((profile) =>(
            <div key={profile.id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:bg-black-300 transition-colors'>
               <a href={profile.navigate} target="_blank" rel="noreferrer"> 
                 <Image src={profile.img} alt={profile.id.toString()} width={20} height={20} />
               </a>
            </div>
        ))}
        </div>
       </div>
       </footer>
  )
}

export default Footer