import { useEffect, useState } from 'react'
import {
  CircleHalf,
  PaintBucket,
  Record,
  SlidersHorizontal,
  Target,
  Waveform,
} from '@phosphor-icons/react'

import { useSelectedLayer } from '@state/global'
import { IconButton } from '@shared'

import styles from './_.module.css'
import LayerProperties from './LayerProperties'
import { debounce, makeID } from '@utils'
import { EventHandler } from '@state/events'

type Mode = '' | 'edit'

const deHandler = debounce(EventHandler, 200)
const handler = (type: 'solid' | 'gradient' | 'noise') =>
  deHandler({
    action: 'bkgd-add-layer',
    payload: {
      id: makeID(),
      type,
    },
  })

const Panel = ({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={
        `absolute left-0 top-0 -translate-x-full rounded-lg p-4 
        opacity-0 shadow-xl backdrop-blur-3xl backdrop-brightness-50
        ` + className
      }
    >
      {children}
    </div>
  )
}

const HoverText = ({ children }: { children: string }) => {
  return (
    <p
      className="
  pointer-events-none absolute left-1/2 top-full z-10
  -translate-x-1/2 -translate-y-full scale-50 select-none whitespace-nowrap 
  rounded-lg px-3 py-1 text-center text-xs font-light uppercase

  text-white opacity-0 backdrop-blur-xl backdrop-brightness-50 transition-all
  group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-300"
    >
      {children}
    </p>
  )
}

export default function Controls() {
  const [mode, setMode] = useState<Mode>('')
  const [selectedLayer] = useSelectedLayer()

  useEffect(() => {
    if (selectedLayer) {
      setMode((prev) => (prev === '' ? 'edit' : prev))
    } else {
      setMode((prev) => (prev === 'edit' ? '' : prev))
    }
  }, [selectedLayer])

  return (
    <section
      id="controls"
      className="grid h-full w-full place-items-start justify-items-end"
    >
      <div className="flex flex-col items-end px-4 py-0">
        <ul className="inline-grid h-12 grid-flow-col items-center gap-2">
          <li className="group relative">
            <IconButton icon={Waveform} onClick={() => handler('noise')} />
            <HoverText>Noise</HoverText>
          </li>
          <li className="group relative">
            <IconButton icon={Target} onClick={() => handler('gradient')} />
            <HoverText>Conic Gradient</HoverText>
          </li>
          <li className="group relative">
            <IconButton icon={Record} onClick={() => handler('gradient')} />
            <HoverText>Radial Gradient</HoverText>
          </li>
          <li className="group relative">
            <IconButton icon={CircleHalf} onClick={() => handler('gradient')} />
            <HoverText>Linear Gradient</HoverText>
          </li>
          <li className="group relative">
            <IconButton icon={PaintBucket} onClick={() => handler('solid')} />
            <HoverText>Solid Color</HoverText>
          </li>

          <li className="group relative">
            <IconButton
              className="transition-all 
              disabled:cursor-not-allowed disabled:opacity-50
              data-[active='true']:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
              disabled={selectedLayer === ''}
              icon={SlidersHorizontal}
              data-active={mode === 'edit'}
              onClick={() => setMode((prev) => (prev === 'edit' ? '' : 'edit'))}
            />
            <HoverText>Edit (e)</HoverText>
          </li>
        </ul>
        <div className="relative">
          <Panel
            className={`${styles.card} ${
              mode === 'edit' ? styles.active : styles.inactive
            }`}
          >
            <LayerProperties />
          </Panel>
        </div>
      </div>
    </section>
  )
}
