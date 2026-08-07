import React from 'react'
import {BentoGrid, BentoGridItem} from './ui/BentoGrid'
import { gridItems } from '@/data'
import { Spotlight } from './ui/Spotlight'

const Grid = () => {
  return (
    <section id='about' className="relative py-20">
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      
      <h1 className='mb-10 text-6xl ml-5 font-bold text-center'> #<span className='text-rose-300'>About </span>me </h1>
       <BentoGrid>
        {gridItems.map(({id,title,description,className,img,imgClassName,spareImg,titleClassName, link, linkText, link2, linkText2}) => (
            <BentoGridItem 
            id={id} 
            key={id}
            title={title}
            description={description}
            className={className}
            img = {img}
            imgClassName={imgClassName}
            spareImg={spareImg}
            titleClassName={titleClassName}
            link={link}
            linkText={linkText}
            link2={link2}
            linkText2={linkText2}
            />


        ))}
       </BentoGrid>
    </section>
  )
}

export default Grid