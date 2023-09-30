import {
  CopySimple,
  Export,
  Flask,
  ImagesSquare,
  PaintBrush,
  Share,
  Stack,
} from '@phosphor-icons/react'
import { throttle } from '@utils'
import { useEffect } from 'react'

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

export default function Highlights() {
  useScrollListener('#createRef')
  useScrollListener('#exportRef')
  useScrollListener('#shareRef')

  return (
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
            <p className="bkgd-impact text-2xl uppercase xl:text-3xl">Copy</p>
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
              <span className="text-xl text-white">Copy CSS to Clipboard</span>
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
            <ImagesSquare weight="duotone" className="text-5xl xl:text-7xl" />
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
            <p className="bkgd-impact text-2xl uppercase xl:text-3xl">Share</p>
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
  )
}
