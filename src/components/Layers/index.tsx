import {
  ArrowSquareOut,
  ArrowsCounterClockwise,
  Clipboard,
  Copy,
  CopySimple,
  DotsThreeOutlineVertical,
  DotsThreeVertical,
  Download,
  Export,
  Eye,
  EyeClosed,
  FileCss,
  FilePng,
  FloppyDisk,
  Icon,
  Trash,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { useVisible } from '@state/global'
import { HoverText, IconButton, List } from '@shared'

import LayerButtons from './LayerButtons'
import { useNavigate } from '@tanstack/router'
import { Menu, Transition } from '@headlessui/react'

const LiButton = ({
  icon,
  id,
  onClick,
}: {
  icon: Icon
  id?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <li id={id}>
      <IconButton icon={icon} onClick={onClick} />
    </li>
  )
}

const VisibilityButton = ({ onClick }: { onClick?: () => void }) => {
  const [hide] = useVisible()
  return <IconButton icon={hide ? EyeClosed : Eye} onClick={onClick} />
}

// TODO: Fix all these styles n buttons
export default function Layers() {
  const navigate = useNavigate()
  return (
    <aside
      id="layers"
      className="z-0 col-start-2 col-end-3 row-start-1 row-end-3"
    >
      <ul className="relative z-10 inline-grid h-12 grid-flow-col items-center rounded-b-md px-2 backdrop-blur-md backdrop-brightness-50">
        <li className="relative">
          <Menu>
            <Menu.Button as="div" className="group relative">
              <span className="absolute inset-0 opacity-0 ui-open:opacity-100">
                <IconButton weight="fill" icon={DotsThreeOutlineVertical} />
              </span>
              <span className="opacity-100 ui-open:opacity-0">
                <IconButton icon={DotsThreeOutlineVertical} />
                <HoverText>Export</HoverText>
              </span>
            </Menu.Button>
            <Transition
              className="absolute left-4 top-3/4 z-30 mt-0 rounded-lg bg-gray-950 bg-opacity-90 shadow-[0_8px_20px_0_#00000040]"
              enter="transition duration-100 ease-out origin-top-left"
              enterFrom="transform scale-50 opacity-0 -translate-y-1/4"
              enterTo="transform scale-100 opacity-100 translate-y-0"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100 translate-y-0"
              leaveTo="transform scale-50 opacity-0 -translate-y-1/4"
            >
              <Menu.Items className="p-1 py-3">
                <Menu.Item>
                  <span
                    className="group relative z-30"
                    onClick={() =>
                      EventHandler({
                        action: 'copy-css',
                        payload: null,
                      })
                    }
                  >
                    <IconButton icon={FileCss} />
                    <HoverText>Copy CSS</HoverText>
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span
                    className="group relative"
                    onClick={() =>
                      EventHandler({
                        action: 'download-image',
                        payload: null,
                      })
                    }
                  >
                    <IconButton icon={Download} />
                    <HoverText>Download</HoverText>
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span
                    className="group relative"
                    // onClick={() =>
                    //   EventHandler({
                    //     action: 'download-image',
                    //     payload: null,
                    //   })
                    // }
                  >
                    <IconButton icon={Export} disabled />
                    <HoverText>Share</HoverText>
                  </span>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
        <li className="group relative" id="vis-button">
          <VisibilityButton
            onClick={() =>
              EventHandler({
                action: 'toggle-ui',
                payload: null,
              })
            }
          />
          <HoverText>Toggle UI</HoverText>
        </li>
        <li className="group relative" onClick={() => navigate({ to: '/' })}>
          <IconButton icon={ArrowsCounterClockwise} />
          <HoverText>Restart</HoverText>
        </li>
      </ul>

      <div className="mt-4">
        <LayerButtons />
      </div>
    </aside>
  )
}
