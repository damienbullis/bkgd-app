import { useEffect, useState } from 'react'
import {
  CircleHalf,
  ClockCountdown,
  PaintBucket,
  Record,
  SlidersHorizontal,
  Waveform,
} from '@phosphor-icons/react'

import { debounce, makeID } from '@utils'
import { HoverText, IconButton } from '@shared'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import LayerProperties from './LayerProperties'

type Mode = '' | 'edit'

const deHandler = debounce(EventHandler, 200)
const handler = (
  type: 'solid' | 'gradient' | 'noise',
  gradientType?: 'linear' | 'radial' | 'conic'
) => {
  deHandler({
    action: 'bkgd-add-layer',
    payload: {
      id: makeID(),
      type,
      props: {
        type: gradientType,
      },
    },
  })
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
      className="z-0 col-start-1 col-end-1 row-start-1 row-end-2 grid h-full w-full place-items-start justify-items-end"
    >
      <div className="flex flex-col items-end px-4 py-0">
        <ul className="inline-grid h-12 grid-flow-col items-center gap-2">
          <li className="group relative">
            <IconButton icon={Waveform} onClick={() => handler('noise')} />
            <HoverText>Noise</HoverText>
          </li>
          <li className="group relative">
            <IconButton
              icon={ClockCountdown}
              onClick={() => handler('gradient', 'conic')}
            />
            <HoverText>Conic Gradient</HoverText>
          </li>
          <li className="group relative">
            <IconButton
              icon={Record}
              onClick={() => handler('gradient', 'radial')}
            />
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
              disabled={selectedLayer === ''}
              icon={SlidersHorizontal}
              onClick={() => setMode((prev) => (prev === 'edit' ? '' : 'edit'))}
            />
            <HoverText>
              {selectedLayer ? 'Edit (e)' : 'Select a layer'}
            </HoverText>
          </li>
        </ul>

        <div
          aria-selected={mode === 'edit'}
          className="-translate-x-full rounded-lg p-4 
            opacity-0 shadow-xl backdrop-blur-3xl backdrop-brightness-50 transition-all duration-200 aria-selected:translate-x-0 aria-selected:opacity-100"
        >
          <LayerProperties />
        </div>
      </div>
    </section>
  )
}
