import { Menu, Transition } from '@headlessui/react'
import IconButton from '../_shared/IconButton'
import {
  ArrowsOutSimple,
  Bug,
  Command,
  GitBranch,
  Question,
} from '@phosphor-icons/react'

export default function HelpMenu() {
  return (
    <div className="relative mx-auto flex py-4">
      <Menu>
        <Menu.Button
          as="div"
          className="rounded-md filter backdrop-blur-md backdrop-brightness-50"
        >
          <IconButton icon={Question} />
        </Menu.Button>
        <Transition
          className="absolute bottom-full right-0 z-10 mb-2 rounded-lg filter backdrop-blur-md backdrop-brightness-50"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0 translate-y-full"
          enterTo="transform scale-100 opacity-100 translate-y-0"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100 translate-y-0"
          leaveTo="transform scale-95 opacity-0 translate-y-full"
        >
          <Menu.Items className="py-3">
            <Menu.Item>
              <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950">
                Shortcuts
                <span className="ml-auto text-lg">
                  <Command />
                </span>
              </p>
            </Menu.Item>
            <Menu.Item>
              <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950">
                Export Size
                <span className="ml-auto text-lg">
                  <ArrowsOutSimple />
                </span>
              </p>
            </Menu.Item>
            <Menu.Item>
              <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap items-center p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950">
                Report Issues
                <span className="ml-auto text-lg">
                  <Bug />
                </span>
              </p>
            </Menu.Item>
            <p className="my-2 mt-3 h-[1px] w-full bg-white bg-opacity-20"></p>
            <Menu.Item>
              <p className="inline-flex min-w-[10rem] max-w-[16rem] cursor-pointer flex-nowrap p-1 px-4 text-sm font-normal ui-active:bg-slate-200 ui-active:text-slate-950">
                Gitub
                <span className="ml-auto text-lg">
                  <GitBranch />
                </span>
              </p>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
