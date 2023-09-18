import { useState } from 'react'
import Icons from '../_shared/Icons'

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer
      id="footer"
      data-active={open}
      className="grid-row group z-0 col-span-full row-start-2 row-end-3 inline-grid
      text-center text-xs text-teal-400 transition-all duration-500 data-[active='false']:grid-rows-[auto_0fr] data-[active='true']:grid-rows-[auto_1fr]"
    >
      <p
        className="cursor-help text-sm text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        {`BKGD.APP`}
        <span className="font-light">
          {` © ${2023} `}
          <span className="group-data-[active='true']:hidden">
            Damien Bullis
          </span>
          <a
            href={'https://github.com/damienbullis'}
            target="_blank"
            className="group-data-[active='false']:hidden"
          >
            Damien Bullis
          </a>
        </span>
      </p>
      <section
        className="group-data-[active='true']:opactiy-100 my-2 flex flex-row
        justify-center gap-4 overflow-hidden text-white transition-opacity duration-500 group-data-[active='false']:opacity-0"
      >
        <p className="font-light">
          {`v (${import.meta.env.VITE_BKGD_VERSION}) `}
          <span className="ml-4">Powered By</span>
        </p>
        <a
          href="https://react.dev/"
          target="_blank"
          className="h-4 w-4 fill-white text-sm transition hover:scale-110"
        >
          <Icons.react />
        </a>
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          className="h-4 w-4 fill-white transition hover:scale-110"
        >
          <Icons.typescript />
        </a>
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="h-4 w-4 fill-white transition hover:scale-110"
        >
          <Icons.tailwind />
        </a>
        <a
          href="https://www.framer.com/"
          target="_blank"
          className="h-4 w-4 fill-white transition hover:scale-110"
        >
          <Icons.framer />
        </a>
        <a
          href="https://vitejs.dev/"
          target="_blank"
          className="h-4 w-4 fill-white transition hover:scale-110"
        >
          <Icons.vite />
        </a>
        <a
          href="https://tanstack.com/router/v1"
          target="_blank"
          className="transition hover:scale-105"
        >
          TanStack
        </a>
      </section>
    </footer>
  )
}
