import { useEffect, useRef } from 'react'
import { useMotionValue, motion, useTransform } from 'framer-motion'

import { throttle } from '@utils'
import bkgdStyles from './bkgdStyles'

export default function Banner() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = throttle((e: MouseEvent) => {
      if (bgRef.current) {
        const size = bgRef.current.getBoundingClientRect()
        const wX = size.width / 2
        const wY = size.height / 2
        const deltaX = e.clientX - (size.left + wX)
        const deltaY = e.clientY - (size.top + wY)

        // Calculate distance using Pythagorean theorem
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

        // Set a scaling factor (adjust this as needed)
        const scaleFactor = 0.1 // Example: scaling by 10%

        // Scale the deltas based on distance
        const scaledDeltaX = deltaX * (scaleFactor * (distance / 1000))
        const scaledDeltaY = deltaY * (scaleFactor * (distance / 1000))
        x.set(50 - scaledDeltaX)
        y.set(50 - scaledDeltaY)
      }
    }, 30)
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [x, y, bgRef])

  const t = useTransform(() => `${x.get()}% ${y.get()}%`)

  return (
    <>
      {/* Background */}
      <div
        className="fixed left-0 top-0 -z-10 h-screen w-screen scale-125 overflow-hidden blur-lg brightness-75 filter"
        style={bkgdStyles[0]}
      />

      {/* Banner */}
      <div className="relative flex h-[80vh] w-full flex-col items-center justify-center">
        <span className="relative w-full">
          <h1
            ref={bgRef}
            style={bkgdStyles[0]}
            className="pointer-events-none relative -left-[2vw] m-0 w-full select-none bg-clip-text 
    text-center text-[50vw] font-medium leading-[1em] tracking-[-.09em] text-transparent
    brightness-75 filter xl:text-[40vw] 2xl:text-[30vw] 2xl:leading-[.9em]"
          >
            BKGD
          </h1>
          <motion.h1
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.09em',
              backgroundPosition: t,
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, .9) 0%, rgb(255, 255, 255, 0) 50%)',
              backgroundSize: '300% 300%',
            }}
            className="pointer-events-none absolute inset-0 -left-[2vw] m-0 w-full select-none bg-clip-text text-center text-[50vw] font-medium leading-[1em] tracking-[-.09em] text-transparent mix-blend-soft-light xl:text-[40vw] 2xl:text-[30vw] 2xl:leading-[.9em]"
          >
            BKGD
          </motion.h1>
        </span>

        {/* Banner - Titles */}
        <p className="mx-4 mt-4 text-center text-4xl text-white">
          An online tool for generating backgrounds
        </p>
        <p className="mt-3 flex items-center gap-2 whitespace-nowrap text-xl">
          using
          <span className="flex items-center gap-1">
            CSS
            <svg
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>CSS3</title>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
            </svg>
          </span>
          <span>&</span>
          <span className="flex items-center gap-1">
            HTML
            <svg
              width="24"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>HTML5</title>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
            </svg>
          </span>
        </p>
      </div>
    </>
  )
}
