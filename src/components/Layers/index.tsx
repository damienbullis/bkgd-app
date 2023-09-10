import {
  ArrowSquareOut,
  ArrowsCounterClockwise,
  Clipboard,
  Copy,
  CopySimple,
  Download,
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
        <li
          className="group relative"
          onClick={() =>
            EventHandler({
              action: 'copy-css',
              payload: null,
            })
          }
        >
          <IconButton icon={FileCss} />
          <HoverText>Copy CSS</HoverText>
        </li>
        <li
          className="group relative"
          onClick={() =>
            EventHandler({
              action: 'download-image',
              payload: null,
            })
          }
        >
          <IconButton icon={ArrowSquareOut} />
          <HoverText>Download</HoverText>
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
