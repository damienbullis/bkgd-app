import { Menu, Transition } from '@headlessui/react'
import IconButton from '../_shared/IconButton'
import {
  ArrowsOutSimple,
  Bug,
  Command,
  FileCss,
  GitBranch,
  Question,
} from '@phosphor-icons/react'
import { useModal } from '../_shared/Modal'

const SubMenu = () => {
  return (
    <Menu>
      <Menu.Button
        onClick={(e) => e.stopPropagation()}
        className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950"
      >
        Export Size
        <span className="ml-auto text-lg">
          <ArrowsOutSimple />
        </span>
      </Menu.Button>
      <Transition
        className="absolute bottom-0 right-full z-20 mr-2 origin-bottom-right rounded-lg bg-slate-200 shadow-[0_8px_20px_0_#00000040]"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-0 opacity-0 translate-x-full"
        enterTo="transform scale-100 opacity-100 translate-x-0"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100 translate-x-0"
        leaveTo="transform scale-0 opacity-0 translate-x-full"
      >
        <Menu.Items className="py-3">
          <p className="inline-flex min-w-[10rem] max-w-[16rem] flex-nowrap p-1 px-4 text-sm font-light text-slate-950 ">
            More Coming Soon...
          </p>
          <Menu.Item>
            <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-light text-slate-950 hover:bg-slate-300">
              1600 x 900
            </p>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default function HelpMenu() {
  const [, setIsOpen] = useModal()
  return (
    <div className="relative mx-auto flex py-2 pb-4">
      <Menu>
        <Menu.Button
          as="div"
          className="rounded-md filter backdrop-blur-md backdrop-brightness-50 hover:backdrop-brightness-75"
        >
          <IconButton icon={Question} />
        </Menu.Button>
        <Transition
          className="absolute bottom-full right-0 z-10 mb-0 rounded-lg filter backdrop-blur-md backdrop-brightness-50"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0 translate-x-full"
          enterTo="transform scale-100 opacity-100 translate-x-0"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100 translate-x-0"
          leaveTo="transform scale-95 opacity-0 translate-x-full"
        >
          <Menu.Items className="py-3">
            <Menu.Item>
              <button onClick={() => setIsOpen(true)}>
                <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950">
                  Shortcuts
                  <span className="ml-auto text-lg">
                    <Command />
                  </span>
                </p>
              </button>
            </Menu.Item>
            <Menu.Item>
              <div className="relative">
                <SubMenu />
              </div>
            </Menu.Item>
            <Menu.Item disabled>
              <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-not-allowed flex-nowrap p-1 px-4 text-sm font-normal decoration-white ui-active:bg-slate-200 ui-active:text-slate-950 ui-disabled:line-through ui-not-disabled:cursor-pointer">
                Copy Format
                <span className="ml-auto text-lg">
                  <FileCss />
                </span>
              </p>
            </Menu.Item>
            <p className="my-2 mt-3 h-[1px] w-full bg-white bg-opacity-20"></p>
            <p className="mb-2 px-4 text-xs font-light uppercase">Links</p>
            <Menu.Item>
              <a
                href="https://github.com/damienbullis/bkgd-app/issues"
                className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap items-center p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950"
              >
                Report Issues
                <span className="ml-auto text-lg">
                  <Bug />
                </span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://github.com/damienbullis/bkgd-app"
                target="_blank"
                className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950"
              >
                Gitub Repo
                <span className="ml-auto text-lg">
                  <GitBranch />
                </span>
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
