import { Export, IceCream, PaintBrush, Spinner } from '@phosphor-icons/react'
import { Suspense, lazy } from 'react'

const Banner = lazy(() => import('./Banner'))

export default function WelcomePage() {
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
      <Suspense
        fallback={
          <div className="grid h-[80vh] w-full place-items-center">
            <Spinner className="animate-spin text-4xl" />
          </div>
        }
      >
        <Banner />
      </Suspense>

      {/* Content */}
      <div className="flex w-full flex-col items-center">
        {/* Start Button */}
        <a
          href={'/' + window.location.search}
          className="group mb-12 mt-6 inline-grid w-auto grid-flow-col grid-cols-[auto_0fr] items-stretch overflow-hidden rounded-lg bg-pink-500 bg-opacity-30 text-xl uppercase transition-all hover:grid-cols-[auto_1fr]"
        >
          <p className="flex items-center p-8 text-center text-white">
            get started
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
