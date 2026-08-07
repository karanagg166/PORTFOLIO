import { workExperience } from '@/data'
import React from 'react'
import { Timeline } from './ui/Timeline'
import Image from 'next/image'

const Experience = () => {
  const data = workExperience.map((item) => ({
    title: item.date || "Ongoing",
    content: (
      <div>
        <div className="flex items-center gap-4 mb-4">
             <Image
                src={item.thumbnail}
                alt={item.thumbnail}
                width={64}
                height={64}
                className="rounded-lg object-cover h-16 w-16"
              />
             <div className="flex flex-col">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200" dangerouslySetInnerHTML={{ __html: item.title }}>
                </h3>
                {/* @ts-ignore */}
                {item.org && (
                    /* @ts-ignore */
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {item.org}
                    </span>
                )}
             </div>
        </div>
       
        <div className="text-neutral-600 dark:text-neutral-300 text-base font-normal mb-8" dangerouslySetInnerHTML={{ __html: item.desc }}>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
            {item.techImages && item.techImages.map((img, idx) => (
                <Image
                    key={idx}
                    src={img}
                    alt="tech-stack"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border border-white/[0.1]"
                />
            ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className='w-full' id='experience'>
        <Timeline data={data} />
    </div>
  )
}

export default Experience