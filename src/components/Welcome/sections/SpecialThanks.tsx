import { Icons } from '@shared'
import bodhiLogo from '../../../assets/bodhi.svg'

export default function SpecialThanks() {
  return (
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
        <h3 className="-translate-x-8 -skew-x-6 text-white text-opacity-40 max-md:-translate-x-0">
          Special Thanks
        </h3>
        <p className="mb-8 border-l-2 border-white border-opacity-30 p-3 px-8">
          These tools were used to build BKGD.APP ❤️ ❤️ ❤️
        </p>
      </div>
    </div>
  )
}
