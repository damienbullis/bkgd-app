import { useEffect, useState } from 'react'
import {
  CircleHalf,
  ClockCountdown,
  Control,
  PaintBucket,
  Plus,
  Record,
  SlidersHorizontal,
  Waveform,
} from '@phosphor-icons/react'

import { debounce, makeID } from '@utils'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'

import LayerProperties from './LayerProperties'
import ControlButton from './ControlButton'
import ControlAddButton from './ControlAddButton'

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
      <div className="flex flex-col items-end gap-2 px-4 py-0">
        <div className="z-10 flex items-stretch justify-center gap-2">
          <ul className="inline-grid h-12 grid-flow-col items-center gap-2 rounded-b-md px-3 backdrop-blur-md backdrop-brightness-50">
            <ControlAddButton
              icon={Waveform}
              title="Noise"
              onClick={() => handler('noise')}
            />

            <ControlAddButton
              icon={ClockCountdown}
              title="Conic Gradient"
              onClick={() => handler('gradient', 'conic')}
            />

            <ControlAddButton
              icon={Record}
              title="Radial Gradient"
              onClick={() => handler('gradient', 'radial')}
            />

            <ControlAddButton
              icon={CircleHalf}
              title="Linear Gradient"
              onClick={() => handler('gradient', 'linear')}
            />

            <ControlAddButton
              icon={PaintBucket}
              title="Solid Color"
              onClick={() => handler('solid')}
            />
          </ul>
          <div className="rounded-b-md px-2 filter backdrop-blur-md backdrop-brightness-50">
            <ul className="flex">
              <ControlButton
                icon={SlidersHorizontal}
                active={mode === 'edit'}
                disabled={selectedLayer === ''}
                title={selectedLayer ? 'Edit (e)' : 'Select a layer'}
                onClick={() =>
                  setMode((prev) => (prev === 'edit' ? '' : 'edit'))
                }
              />
            </ul>
          </div>
        </div>

        <div
          aria-selected={mode === 'edit'}
          className="z-0 -translate-x-full rounded-lg p-4
            opacity-0 shadow-xl backdrop-blur-3xl backdrop-brightness-50 transition-all duration-200 aria-selected:translate-x-0 aria-selected:opacity-100"
        >
          <LayerProperties />
        </div>
      </div>
    </section>
  )
}
