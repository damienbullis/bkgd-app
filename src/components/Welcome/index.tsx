import {
  CopySimple,
  Export,
  Flask,
  IceCream,
  ImagesSquare,
  InstagramLogo,
  LinkedinLogo,
  PaintBrush,
  Share,
  Spinner,
  Stack,
} from '@phosphor-icons/react'
import { Suspense, lazy, useEffect } from 'react'
import Icons from '../_shared/Icons'
import throttle from '../../utils/throttle'
import bodhiLogo from '../../assets/bodhi.svg'

const Banner = lazy(() => import('./Banner'))

const smoothScroll = () => {
  const target = document.querySelector('#about-bkgd')
  if (target) {
    const currentPos = window.scrollY
    const dist = target.getBoundingClientRect().top - currentPos
    window.scrollTo({
      top: dist,
      behavior: 'smooth',
    })
  }
}

function isElementVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  console.log({ rect })
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const handleScroll = throttle((el: HTMLElement, handler: () => void) => {
  if (isElementVisible(el)) {
    el.dataset.show = 'true'
    window.removeEventListener('scroll', handler) // Remove the listener once triggered
  }
}, 100)

function useScrollListener(id: string) {
  useEffect(() => {
    const element = document.querySelector<HTMLElement>(id)
    if (!element) return

    const handler = () => handleScroll(element, handler)

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [id])

  return
}

export default function WelcomePage() {
  useScrollListener('#createRef')
  useScrollListener('#exportRef')
  useScrollListener('#shareRef')

  return (
    <>
      {/* Header */}
      <div className="absolute left-0 top-0 z-10 inline-flex w-full items-center justify-center p-4">
        <button
          onClick={smoothScroll}
          className="font-light underline decoration-transparent decoration-dashed decoration-1 underline-offset-4 transition hover:decoration-white active:scale-95"
        >
          What is BKGD.APP?
        </button>
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
          <div className="mx-8 my-12 inline-grid w-full auto-cols-fr items-start justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:mx-0 xl:w-3/4">
            <div
              className="relative mt-0 flex flex-col overflow-hidden 
            rounded-lg bg-gray-900 bg-opacity-30 p-8 pl-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-green-500"></div>

              <p className="flex flex-row items-center gap-4 text-2xl">
                <span className="text-2xl">
                  <PaintBrush weight="duotone" />
                </span>
                Create
              </p>
              <hr className="mb-4 mt-8 opacity-20" />
              <p className="text-xl font-light">
                Start designing your <b>BKGD</b> by{' '}
                <u className="decoration-pink-500 decoration-wavy underline-offset-4">
                  stacking
                </u>{' '}
                layers, and adjusting properties.
              </p>
            </div>
            <div
              id="createRef"
              data-show={false}
              className="group row-span-1 flex h-full flex-wrap items-stretch justify-stretch p-4 max-md:hidden lg:col-span-2"
            >
              <div className="inline-flex w-full -translate-y-full items-center justify-center gap-4 transition-all group-data-[show='true']:translate-y-0 lg:w-1/2">
                <Stack weight="duotone" className="text-5xl xl:text-7xl" />
                <p className="bkgd-impact text-2xl uppercase xl:text-3xl">
                  Add Layers
                </p>
              </div>
              <div className="inline-flex w-full items-center justify-center gap-4 lg:w-1/2">
                <Flask weight="duotone" className="text-5xl xl:text-7xl" />
                <p className="bkgd-impact text-2xl uppercase xl:text-3xl">
                  Tweak Design
                </p>
              </div>
            </div>
            <div className="relative row-span-1 flex h-full flex-wrap items-stretch justify-stretch p-4 max-md:hidden lg:col-span-1">
              <div className="absolute left-full top-0 flex h-full items-center lg:hidden">
                <p>or</p>
              </div>
              <div
                id="exportRef"
                data-show={false}
                className="mx-auto flex w-full flex-col items-center justify-center gap-4 py-8 transition-transform hover:scale-110"
              >
                <CopySimple weight="duotone" className="text-5xl xl:text-7xl" />
                <p className="bkgd-impact text-2xl uppercase xl:text-3xl">
                  Copy
                </p>
              </div>
            </div>
            <div
              className="relative flex flex-col overflow-hidden rounded-lg
            bg-gray-900 bg-opacity-30 p-8 pl-12 max-lg:hidden max-md:flex"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-amber-500"></div>

              <p className="flex flex-row items-center gap-4 text-2xl">
                <span className="text-2xl">
                  <Export weight="duotone" />
                </span>
                Export
              </p>
              <hr className="my-8 opacity-20" />

              <ul className="flex list-inside list-disc flex-col gap-2 font-light">
                <li className="text-gray-300">
                  <span className="text-xl text-white">
                    Copy CSS to Clipboard
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="text-xl text-white">Download Image</span>
                </li>
              </ul>
              <hr className="my-4 opacity-0" />

              <p className="text-base text-slate-300">
                Currently image downloading is only available through Chrome dev
                tools, using screenshot node capture.
              </p>
            </div>
            <div
              id="exportRef2"
              data-show={false}
              className="row-span-1 flex h-full flex-wrap items-stretch justify-stretch p-4 max-md:hidden lg:col-span-1"
            >
              <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 py-20 transition-transform hover:scale-110">
                <ImagesSquare
                  weight="duotone"
                  className="text-5xl xl:text-7xl"
                />
                <p className="bkgd-impact text-2xl uppercase xl:text-3xl">
                  Download
                </p>
              </div>
            </div>
            <div
              id="shareRef"
              data-show={false}
              className="col-span-2 h-full max-lg:col-span-1 max-md:hidden"
            >
              <div
                className="ml-auto flex h-full w-1/2 items-center justify-center 
              gap-4 max-lg:ml-auto max-lg:w-full"
              >
                <Share weight="duotone" className="text-5xl xl:text-7xl" />
                <p className="bkgd-impact text-2xl uppercase xl:text-3xl">
                  Share
                </p>
              </div>
            </div>

            <div
              className="relative mt-0 flex flex-col overflow-hidden 
              rounded-lg bg-gray-900 bg-opacity-30 p-8 pl-12"
            >
              <div className="absolute bottom-0 left-0 top-0 w-2 bg-sky-500"></div>

              <p className="flex flex-row items-center gap-4 text-2xl">
                <span className="text-2xl">
                  <Export weight="duotone" />
                </span>
                Export
              </p>
              <hr className="my-8 opacity-20" />

              <p className="text-xl font-light">
                With URL state you can bookmark ⭐ or share with a friend 🔗
              </p>
            </div>
          </div>
        </div>

        {/* About & Misc */}
        <div className="flex w-full justify-center overflow-hidden bg-gray-950 pb-12 ">
          <div className="flex w-3/4 flex-col items-center">
            <div className="mb-20 max-w-3xl">
              <h3 className="-translate-x-8 -skew-x-6 text-white text-opacity-40">
                Motivation
              </h3>
              <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
                <p className="mb-4 mr-auto">
                  While working on some different projects, I was tired of just
                  using a solid color or some sort of subtle gradient for my
                  backgrounds. Or going through the hassle of creating some sort
                  of image.
                </p>
                <p className="mb-4 mr-auto">
                  At the same time I was reading up on a lot of CSS Level 3 & 4
                  specifications, and I thought it would be fun to build a tool
                  that used some of those features.
                </p>
                <p className="mb-4 mr-auto">
                  Taking inspiration from tools like Photoshop, I wanted to
                  leverage the power of the browser <i>(Chrome atleast)</i>,
                  CSS, and HTML to create a simple and intuitive tool for
                  designing backgrounds.
                </p>
                <p className="mb-4 mr-auto">
                  I wanted something better, easier to use, and designed with
                  the web in mind.
                </p>
              </div>
            </div>
            <div className="mb-20 flex w-full max-w-3xl flex-row gap-12 max-lg:flex-col-reverse">
              <div className="mt-4 w-1/2 rounded-md bg-white bg-opacity-10 max-lg:mx-auto max-md:w-max">
                <ol className="mx-auto list-inside list-decimal p-8 text-left text-base">
                  <li className="mb-1">Keep it simple</li>
                  <li className="mb-1">Export as code or image</li>
                  <li className="mb-1">Save backgrounds for later</li>
                  <li className="mb-1">
                    Use URL State:
                    <ul className="mb-2 ml-8 list-disc text-sm">
                      <li className="mb-1">Leverage browser history</li>
                      <li className="mb-1">Sharing</li>
                      <li className="mb-1">Persisting state</li>
                    </ul>
                  </li>
                  <li className="mb-1">Learn new technologies</li>
                  <li className="mb-1">Portfolio</li>
                </ol>
              </div>
              <div className="ml-4 w-auto max-lg:ml-0 max-lg:w-full">
                <h3 className="-translate-x-8 -skew-x-6 text-white text-opacity-40">
                  Goals
                </h3>
                <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
                  <p className="mb-4 ml-auto w-auto">
                    When I set out to build BKGD.APP, I had a few goals in
                    mind...
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto mb-20 max-w-3xl">
              <h3 className="w-auto -translate-x-8 -skew-x-6 text-white text-opacity-40">
                About Me
              </h3>
              <div className="border-l-2 border-white border-opacity-30 p-3 px-8">
                <p className="mb-4">Hi I'm Damien.</p>
                <p className="mb-4">
                  I work as a Senior Software Engineer, and I have been in web
                  development for going on a decade now.
                </p>
                <p className="mb-4">
                  Presentation is part of design. I love to create, and I love
                  to learn. I was really excited to use this project as an
                  opportunity to learn some new technologies, level up some of
                  my weaker skills, and to work on something more creative in
                  nature.
                </p>
              </div>
              <div className="flex flex-row justify-center gap-2">
                <a
                  href="https://www.instagram.com/damienbullis/"
                  className="cursor-pointer p-2 text-4xl transition-colors hover:text-pink-500 active:text-pink-300"
                >
                  <InstagramLogo weight="duotone" />
                </a>
                <a
                  href="https://www.linkedin.com/in/damienbullis/"
                  className="cursor-pointer p-2 text-4xl transition-colors hover:text-pink-500 active:text-pink-300"
                >
                  <LinkedinLogo weight="duotone" />
                </a>
              </div>
            </div>

            <div className="mb-20 flex w-full flex-row items-center justify-center gap-12 max-lg:flex-col-reverse max-lg:gap-0">
              <div className="grid w-1/2 auto-rows-auto grid-cols-3 place-content-center place-items-center gap-4 py-8 pt-12 max-lg:w-full max-md:pt-4">
                <a
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                  href="https://bodhi.digital/"
                  target="_blank"
                >
                  <img src={bodhiLogo} className="" />
                </a>
                <a
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                  href="https://react.dev/"
                  target="_blank"
                >
                  <Icons.react />
                </a>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.typescript />
                </a>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.tailwind />
                </a>
                <a
                  href="https://www.framer.com/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.framer />
                </a>
                <a
                  href="https://vitejs.dev/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.vite />
                </a>
                <a
                  href="https://bun.sh/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.bun />
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  className="h-10 w-10 rounded-md fill-white p-2 text-2xl transition-all hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  <Icons.github />
                </a>
                <a
                  href="https://tanstack.com/router/v1"
                  target="_blank"
                  className="h-10 rounded-md p-2 text-xl transition hover:scale-110 hover:bg-white hover:bg-opacity-10"
                >
                  TanStack
                </a>
              </div>
              <div className="max-lg:w-full">
                <h3 className="-translate-x-8 -skew-x-6 text-white text-opacity-40">
                  Special Thanks
                </h3>
                <p className="mb-8 border-l-2 border-white border-opacity-30 p-3 px-8">
                  These tools were used to build BKGD.APP
                  <br /> ❤️ ❤️ ❤️
                </p>
              </div>
            </div>
            <br />
            <p className="inline-flex gap-20">
              <span>*</span>
              <span>*</span>
              <span>*</span>
            </p>
            <br />
            <div className="mx-auto mt-20 max-w-xl text-white text-opacity-80">
              <h4 className="mb-2">Caveats</h4>
              <p className="mb-4 font-light">
                BKGD.APP is still in development, and there are a few things to
                be aware of...
              </p>
              <ul className="mx-auto max-w-md list-inside list-disc text-sm">
                <li>Designed for Chrome</li>
                <li>Designed for Desktop</li>
                <li>Image export process is pretty jank, and very manual.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
