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

function isElementVisible(el: HTMLElement, offset: number) {
  const rect = el.getBoundingClientRect()
  console.log({ rect })
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom + offset <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const handleScroll = throttle(
  (
    el: HTMLElement,
    handler: () => void,
    targets: string | Array<string>,
    offset: number
  ) => {
    if (isElementVisible(el, offset)) {
      el.dataset.show = 'true'
      if (typeof targets === 'string') {
        const _targets = document.querySelectorAll<HTMLElement>(targets)
        if (_targets) {
          for (const target of _targets) {
            target.dataset.show = 'true'
          }
        }
      } else {
        for (const target of targets) {
          const _targets = document.querySelectorAll<HTMLElement>(target)
          if (_targets) {
            for (const _target of _targets) {
              _target.dataset.show = 'true'
            }
          }
        }
      }
      window.removeEventListener('scroll', handler) // Remove the listener once triggered
    }
  },
  100
)

function useScrollListener(
  sourceId: string,
  targets: string | Array<string> = sourceId,
  offset = 0
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(sourceId)
    if (!elements) return
    const elHandlers: (() => void)[] = []
    for (const element of elements) {
      const handler = () => handleScroll(element, handler, targets, offset)
      elHandlers.push(handler)
      window.addEventListener('scroll', handler)
    }
    return () => {
      for (const handler of elHandlers) {
        window.removeEventListener('scroll', handler)
      }
    }
  }, [sourceId, targets, offset])

  return
}

export default function Highlights() {
  useScrollListener('#createRef', undefined, -200)
  useScrollListener(
    '#exportRefSrc',
    ['#exportRefTarget', '#exportRefTarget2'],
    200
  )
  useScrollListener('#shareRef', undefined, 200)

  return (
    <div
      id="about-bkgd"
      className="flex w-full justify-center overflow-hidden bg-gradient-to-b from-transparent to-gray-950 pb-12 bg-blend-overlay"
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
          data-show={'false'}
          className="group row-span-1 flex h-full flex-wrap items-stretch justify-stretch p-4 max-md:hidden lg:col-span-2"
        >
          <div className="pointer-events-none inline-flex w-full -translate-y-full items-center justify-center gap-4 opacity-0 transition-all duration-1000 group-data-[show=true]:translate-y-0 group-data-[show=true]:opacity-100 lg:w-1/2">
            <Stack weight="duotone" className="text-5xl xl:text-7xl" />
            <p className="bkgd-impact text-2xl uppercase xl:text-3xl">Add</p>
          </div>
          <div className="pointer-events-none inline-flex w-full -translate-y-full items-center justify-center gap-4 opacity-0 transition-all delay-500 duration-1000 group-data-[show=true]:translate-y-0 group-data-[show=true]:opacity-100 lg:w-1/2">
            <Flask weight="duotone" className="text-5xl xl:text-7xl" />
            <p className="bkgd-impact text-2xl uppercase xl:text-3xl">Tweak</p>
          </div>
        </div>
        <div className="relative row-span-1 flex h-full flex-wrap items-stretch justify-stretch p-4 max-md:hidden lg:col-span-1">
          <div className="absolute left-full top-0 flex h-full items-center lg:hidden">
            <p>or</p>
          </div>
          <div
            id="exportRefTarget"
            data-show={'false'}
            className="pointer-events-none mx-auto flex w-full -translate-x-full flex-col items-center justify-center gap-4 py-8 opacity-0 transition-all duration-1000 hover:scale-110 data-[show='true']:translate-x-0 data-[show='true']:opacity-100"
          >
            <CopySimple weight="duotone" className="text-5xl xl:text-7xl" />
            <p className="bkgd-impact text-2xl uppercase xl:text-3xl">Copy</p>
          </div>
        </div>
        <div
          id="exportRefSrc"
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
          id="exportRefTarget2"
          data-show="false"
          className="pointer-events-none mx-auto flex w-full translate-x-full flex-col items-center justify-center gap-4 py-8 opacity-0 transition-all delay-500 duration-1000 hover:scale-110 data-[show=true]:translate-x-0 data-[show=true]:opacity-100 max-md:hidden"
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
          className="col-span-2 h-full translate-y-full opacity-0
          transition-all duration-1000 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 max-lg:col-span-1 max-md:hidden"
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
            With URL state you can easily bookmark ⭐ or share 🔗 your designs.
          </p>
        </div>
      </div>
    </div>
  )
}
