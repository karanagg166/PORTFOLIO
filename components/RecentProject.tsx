"use client"
import { projects } from '@/data'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { LampContainer } from './ui/LampEffect'
import { PinContainer } from './ui/3d-pin'
import { FaLocationArrow, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MagicButton } from './ui/MagicButton'
import Image from 'next/image'

// ─── Per-project image carousel ────────────────────────────────────────────────
interface CarouselProps {
  images: string[]
  title: string
}

const ProjectCarousel = ({ images, title }: CarouselProps) => {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = images.length

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  // Auto-cycle every 3 s, pauses on hover
  useEffect(() => {
    if (total <= 1 || isHovered) return
    intervalRef.current = setInterval(next, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, next, total])

  // Touch / pointer swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d] flex flex-col items-center justify-center border border-white/[0.08] p-6 group">
        <Image fill src="/bg.png" alt="Background" className="object-cover opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shadow-inner">
            <span className="text-xl">🚀</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            {title.split('—')[0].trim()}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Background tint */}
      <Image fill src="/bg.png" alt="Background" className="object-cover opacity-40" />

      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            <Image
              fill
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 384px"
            />
          </div>
        ))}
      </div>

      {/* Left / Right arrows — only show if more than 1 image */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-[10px]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
            aria-label="Next image"
          >
            <FaChevronRight className="text-[10px]" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrent(i) }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      {total > 1 && (
        <div className="absolute top-2 right-2 z-20 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full border border-white/10">
          {current + 1} / {total}
        </div>
      )}
    </div>
  )
}

// Helper to determine accurate link label (avoid claiming live site for repo links)
const getProjectLinkLabel = (link?: string) => {
  if (!link) return 'View Project'
  if (link.toLowerCase().includes('github.com')) {
    return 'View Repository'
  }
  return 'View Project'
}

// ─── Main section ───────────────────────────────────────────────────────────────
const RecentProject = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <section id="projects">
      <div className="py-20 flex flex-col justify-center items-center">
        <LampContainer>
          <h1 className="heading mb-4 text-center text-4xl md:text-6xl font-bold tracking-tight">
            A small selection of <br />
            <span className="text-lime-200">Recent Projects</span>
          </h1>

          <div className="mt-8">
            <a href="https://github.com/karanagg166" target="_blank" rel="noreferrer">
              <MagicButton title="View GitHub Profile" icon={<FaLocationArrow />} position="right" />
            </a>
          </div>
          <div className="w-24 h-2 mt-5 rounded-lg bg-gradient-to-r from-slate-300 to-slate-500 opacity-50" />
        </LampContainer>

        <div className="flex flex-wrap items-center justify-center p-4 gap-y-20 gap-x-16 -mt-32 md:-mt-64">
          {projects.length > 0 ? projects.map(({ id, title, des, images, iconLists, link, color }) => (
            <div
              key={id}
              className="min-h-[28rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-96 w-[80vw]"
            >
              <PinContainer title={link} href={link}>
                {/* Carousel image area */}
                <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[28vh] mb-5">
                  <ProjectCarousel images={images} title={title} />
                </div>

                <h1 className="font-bold lg:text-xl md:text-lg text-base line-clamp-1 text-white">
                  {title}
                </h1>
                <p className="lg:text-sm lg:font-normal font-light text-xs line-clamp-2 text-slate-400 mt-2">
                  {des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-2">
                  <div className="flex items-center">
                    {iconLists.map((icon, index) => (
                      <div
                        key={icon}
                        className="border border-white/[0.2] rounded-full bg-black lg:w-9 lg:h-9 w-8 h-8 flex justify-center items-center"
                        style={{ transform: `translateX(-${5 * index * 2}px)` }}
                      >
                        <Image src={icon} alt={icon} width={26} height={26} className="p-1.5" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center shrink-0">
                    <p className="text-xs sm:text-sm font-medium text-purple whitespace-nowrap group-hover/pin:text-purple-300 transition-colors duration-200">
                      {getProjectLinkLabel(link)}
                    </p>
                    <FaLocationArrow className="ms-2 text-purple text-xs shrink-0 group-hover/pin:translate-x-0.5 group-hover/pin:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </PinContainer>
            </div>
          )) : (
            <p className="text-center text-gray-500">No recent projects available.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default RecentProject
