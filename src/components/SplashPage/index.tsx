import { CSSProperties, useEffect, useRef } from 'react'
import { Export, IceCream, PaintBrush } from '@phosphor-icons/react'
import { useMotionValue, motion, useTransform } from 'framer-motion'

import { throttle } from '@utils'
import router from '../../router'

// TODO: Split into seperate files

const textBackground: CSSProperties[] = [
  {
    backgroundImage:
      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMC43NSI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJ0dXJidWxlbmNlIgogICAgICBiYXNlRnJlcXVlbmN5PSIwLjI0IgogICAgICBudW1PY3RhdmVzPSI3IgogICAgICBzdGl0Y2hUaWxlcz0ic3RpdGNoIgogICAgLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPgo8L3N2Zz4="), conic-gradient(from 162deg at 0% 100% in oklab, rgba(193, 26, 179, 0.22) 0%, rgb(140, 193, 11) 135%), linear-gradient(0deg, rgba(199, 199, 199, 0.58), rgba(199, 199, 199, 0.58)), radial-gradient(50% 50% at 50% 95% in oklch, rgba(77, 117, 78, 0.37) 105%, rgba(24, 10, 230, 0.9) 170%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMC40NiI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJmcmFjdGFsTm9pc2UiCiAgICAgIGJhc2VGcmVxdWVuY3k9IjAuMDciCiAgICAgIG51bU9jdGF2ZXM9IjMiCiAgICAgIHN0aXRjaFRpbGVzPSJzdGl0Y2giCiAgICAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIC8+Cjwvc3ZnPg=="), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMC40Ij4KICA8ZmlsdGVyIGlkPSJub2lzZSI+CiAgICA8ZmVUdXJidWxlbmNlCiAgICAgIHR5cGU9ImZyYWN0YWxOb2lzZSIKICAgICAgYmFzZUZyZXF1ZW5jeT0iMC42NSIKICAgICAgbnVtT2N0YXZlcz0iMSIKICAgICAgc3RpdGNoVGlsZXM9Im5vU3RpdGNoIgogICAgLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPgo8L3N2Zz4="), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMSI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJmcmFjdGFsTm9pc2UiCiAgICAgIGJhc2VGcmVxdWVuY3k9IjAuNjIiCiAgICAgIG51bU9jdGF2ZXM9IjciCiAgICAgIHN0aXRjaFRpbGVzPSJzdGl0Y2giCiAgICAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIC8+Cjwvc3ZnPg=="), linear-gradient(in oklch, rgb(218, 212, 222) 50%, rgb(164, 73, 70))',
    backgroundBlendMode:
      'soft-light, saturation, color-dodge, color-burn, multiply, luminosity, color-dodge, normal',
    backgroundPosition:
      '0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 30% 0%, 0% 0%',
    backgroundSize: '30%, 100%, auto, 100% 100%, 10%, auto, 1000%, auto',
    backgroundRepeat:
      'repeat, no-repeat, repeat, repeat, repeat, repeat, repeat, repeat',
    mixBlendMode: 'hard-light',
  },
  {
    backgroundImage:
      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMSI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJmcmFjdGFsTm9pc2UiCiAgICAgIGJhc2VGcmVxdWVuY3k9IjAuNzYiCiAgICAgIG51bU9jdGF2ZXM9IjkiCiAgICAgIHN0aXRjaFRpbGVzPSJzdGl0Y2giCiAgICAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIC8+Cjwvc3ZnPg=="), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMSI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJmcmFjdGFsTm9pc2UiCiAgICAgIGJhc2VGcmVxdWVuY3k9IjAuNDYiCiAgICAgIG51bU9jdGF2ZXM9IjQiCiAgICAgIHN0aXRjaFRpbGVzPSJzdGl0Y2giCiAgICAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIC8+Cjwvc3ZnPg=="), linear-gradient(360deg in oklch, rgb(242, 244, 241) -65%, rgb(61, 187, 248) 60%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCIgb3BhY2l0eT0iMSI+CiAgPGZpbHRlciBpZD0ibm9pc2UiPgogICAgPGZlVHVyYnVsZW5jZQogICAgICB0eXBlPSJ0dXJidWxlbmNlIgogICAgICBiYXNlRnJlcXVlbmN5PSIwLjI4IgogICAgICBudW1PY3RhdmVzPSIxIgogICAgICBzdGl0Y2hUaWxlcz0ic3RpdGNoIgogICAgLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPgo8L3N2Zz4="), linear-gradient(0deg in oklch, rgba(251, 255, 38, 0.88), rgba(29, 123, 165, 0.2) 100%), linear-gradient(0deg in oklab, rgb(168, 75, 205), rgb(197, 108, 3) 100%)',
    backgroundBlendMode:
      'color-dodge, color-dodge, color-burn, difference, saturation, normal',
    backgroundPosition: '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
    backgroundSize: 'auto, 50%, auto, 500% 1000%, auto, auto',
    backgroundRepeat: 'repeat, repeat, repeat, repeat, repeat, repeat',
    mixBlendMode: 'color-dodge',
  },
]

export default function SplashPage() {
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
      {/* Header */}
      <div className="absolute left-0 top-0 z-10 inline-flex w-full items-center justify-center p-4">
        <a
          href="#about-bkgd"
          className="font-light underline decoration-transparent decoration-dashed decoration-1 underline-offset-4 transition hover:decoration-white active:scale-95"
        >
          What is BKGD.APP?
        </a>
      </div>

      {/* Background */}
      <div
        className="fixed left-0 top-0 -z-10 h-screen w-screen scale-125 overflow-hidden blur-lg brightness-75 filter"
        style={textBackground[0]}
      />

      {/* Banner */}
      <div className="relative flex h-[80vh] w-full flex-col items-center justify-center">
        <span className="relative w-full">
          <h1
            ref={bgRef}
            style={textBackground[0]}
            className="pointer-events-none relative -left-[2vw] m-0 w-full select-none bg-clip-text 
            text-center text-[50vw] font-medium leading-[1em] tracking-[-.09em] text-transparent
            brightness-75 filter xl:text-[40vw]"
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
            className="pointer-events-none absolute inset-0 -left-[2vw] m-0 w-full select-none bg-clip-text text-center text-[50vw] font-medium leading-[1em] tracking-[-.09em] text-transparent mix-blend-soft-light xl:text-[40vw]"
          >
            BKGD
          </motion.h1>
        </span>

        {/* Banner - Titles */}
        <p className="mt-4 text-4xl text-white">
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
              fill="#1572B6"
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
              fill="#E34F26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>HTML5</title>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
            </svg>
          </span>
        </p>
      </div>

      {/* Content */}
      <div className="flex w-full flex-col items-center">
        {/* Start Button */}
        <a
          href={'/' + router.state.currentLocation.searchStr}
          className="group mb-12 mt-6 inline-grid w-auto grid-flow-col grid-cols-[auto_0fr] items-stretch overflow-hidden rounded-lg bg-pink-500 bg-opacity-30 text-xl uppercase transition-all hover:grid-cols-[auto_1fr]"
        >
          <p className="flex items-center p-8 text-center text-white">
            <span className="mr-2">start</span>
            building
          </p>
          <span className="grid w-full place-content-center overflow-hidden bg-pink-500 p-1 text-5xl transition-all group-hover:scale-100 group-hover:p-4">
            <IceCream
              weight="duotone"
              className="inline-grid w-full scale-0 group-hover:scale-100"
            />
          </span>
        </a>

        {/* Highlights & Features */}
        <div
          id="about-bkgd"
          className="flex w-full justify-center bg-gradient-to-b from-transparent to-gray-950 pb-12 bg-blend-overlay"
        >
          <div className="my-12 inline-grid w-3/4 grid-cols-3 items-start justify-center gap-4">
            <div
              className="relative mt-0 flex flex-col overflow-hidden 
            rounded-lg bg-gray-900 bg-opacity-30 p-8 pl-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-green-500"></div>

              <p className="flex flex-row items-center gap-4 text-xl">
                <span className="text-2xl">
                  <PaintBrush weight="duotone" />
                </span>
                Create
              </p>
              <hr className="my-8 opacity-20" />
              <ul className="flex list-disc flex-col gap-2 font-light">
                <li className="text-gray-300">
                  <span className="text-lg text-white">
                    Gradients, Noise, Solid Colors
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="text-lg text-white">
                    Simple & Intuitive UI
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="text-lg text-white">
                    Leverage Modern CSS3 & HTML5
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-span-2"></div>
            <div></div>
            <div
              className="relative flex flex-col overflow-hidden 
            rounded-lg bg-gray-900 bg-opacity-30 p-8 pl-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-amber-500"></div>

              <p className="flex flex-row items-center gap-4 text-xl">
                <span className="text-2xl">
                  <Export weight="duotone" />
                </span>
                Export
              </p>
              <hr className="my-8 opacity-20" />

              <ul className="flex list-disc flex-col gap-2 font-light">
                <li className="text-gray-300">
                  <span className="text-lg text-white">
                    Copy CSS to Clipboard
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="text-lg text-white">Download Image**</span>
                </li>
              </ul>
              <hr className="my-8 opacity-0" />

              <p className="text-sm text-slate-300">
                ** Image download only available through Chrome dev toolss
              </p>
            </div>
            <div></div>
            <div className="col-span-2"></div>
            <div
              className="relative mt-0 flex flex-col overflow-hidden 
            rounded-lg bg-sky-500 bg-opacity-30 p-8 pl-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-sky-500"></div>
              <p>Share</p>
            </div>
          </div>
        </div>

        {/* About & Misc */}
        <div className="flex w-full justify-center bg-gray-950 py-12">
          <div className="flex w-3/4 flex-col items-center">
            <h3 className="mr-auto">Motivation</h3>
            <p className="mb-4 mr-auto w-1/2">
              Some little section of text Some little section of text Some
              little section of text Some little section of text Some little
              section of text Some little section of text Some little section of
              text Some little section of text
            </p>
            <div className="my-8 flex max-w-screen-sm flex-col items-center justify-center gap-4">
              <p className="text-center text-xl text-white">
                BKGD.APP is free and online tool for creating beautiful modern
                backgrounds for your websites, apps, and more.
              </p>
              <hr />
              <p>RoadMap</p>
              <hr />
              <p className="text-center text-white">
                BKGD.APP is built with React, TypeScript, and TailwindCSS.
              </p>
              <hr />
              <p className="text-center text-white">
                Motivation for building BKGD.APP
              </p>
              <p className="text-center text-white">Caveats*</p>
              <p className="text-center text-white">Using BKGD.APP</p>
              <p className="text-center text-white">Damien + Links</p>
              <hr className="mb-48" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
