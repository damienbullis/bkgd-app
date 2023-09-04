import { useEffect, useRef } from 'react'
import { GradientStopsType, getID, transformColorValue } from './_helpers'
import {
  CircleDashed,
  CrosshairSimple,
  MinusSquare,
  PaintBucket,
  PlusSquare,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { debounce } from '@utils'
import StopInput from './StopInput'

const deHandler = debounce(EventHandler, 200)

const GradientStop = ({
  index,
  color,
  opacity,
  stop,
  allStops,
  selectedLayer,
}: {
  index: number
  color: GradientStopsType[0]
  opacity: GradientStopsType[1]
  stop: GradientStopsType[2]
  allStops: GradientStopsType[]
  selectedLayer: string
}) => {
  const prevSelectedLayer = useRef(selectedLayer)
  const isArr = Array.isArray(stop)
  const _pos = Math.floor((100 / allStops.length) * (index + 1))

  useEffect(() => {
    if (prevSelectedLayer.current !== selectedLayer) {
      prevSelectedLayer.current = selectedLayer
      const _id = getID(index)
      const _color = document.querySelector<HTMLInputElement>(`#${_id}color`)
      const _opacity = document.querySelector<HTMLInputElement>(
        `#${_id}opacity`
      )

      if (_color) _color.value = transformColorValue(color)
      if (_opacity) _opacity.value = String(opacity ?? 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer])
  return (
    <div className="flex w-full flex-row flex-wrap items-center p-2 py-1">
      <div className="mr-4 flex items-center justify-start gap-2">
        <h5>{index + 1}</h5>
        <div className="relative flex cursor-pointer">
          <div className="bottom pointer-events-none absolute inset-0 z-[1] flex place-content-center place-items-center">
            <PaintBucket className="pointer-events-none text-xl" />
          </div>
          <input
            id={getID(index) + 'color'}
            className="h-8 w-8 cursor-pointer appearance-none overflow-hidden rounded-full
            [&::-webkit-color-swatch-wrapper]:border-0
            [&::-webkit-color-swatch-wrapper]:p-0
            [&::-webkit-color-swatch]:border-0
            [&::-webkit-color-swatch]:outline-0"
            type="color"
            defaultValue={transformColorValue(color)}
            onChange={(e) => {
              allStops[index][0] = e.target.value
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    stops: allStops,
                  },
                },
              })
            }}
          />
        </div>
      </div>
      <div
        id={getID(index) + 'opacity-wrap'}
        data-active={false}
        onClick={() => {
          const curr = document.querySelector<HTMLDivElement>(
            `#${getID(index)}opacity-wrap`
          )
          if (curr) {
            curr.dataset.active =
              curr.dataset.active === 'true' ? 'false' : 'true'
          }
        }}
        className="group mr-4 flex cursor-pointer items-center justify-start gap-2"
      >
        <CircleDashed />
        <span className="relative p-1 text-white">
          {opacity ?? 100}%
          <input
            className="pointer-events-none absolute left-1/2 top-full z-10 min-w-[100px] 
            -translate-x-1/2 translate-y-full scale-50 opacity-0 transition-all
            before:absolute before:-inset-1
            before:z-[-1] before:rounded before:bg-white before:shadow-md 
            group-data-[active='true']:pointer-events-auto group-data-[active='true']:translate-y-0 group-data-[active='true']:scale-100 group-data-[active='true']:opacity-100"
            id={getID(index) + 'opacity'}
            type="range"
            defaultValue={opacity ?? 100}
            min={0}
            max={100}
            onChange={(e) =>
              deHandler({
                action: 'bkgd-update-layer',
                payload: {
                  id: selectedLayer,
                  type: 'gradient',
                  props: {
                    type: 'linear',
                    stops: allStops.map((s, i) =>
                      i === index ? [s[0], Number(e.target.value), s[2]] : s
                    ),
                  },
                },
              })
            }
          />
        </span>
      </div>
      <div className="flex cursor-pointer flex-row items-center justify-start">
        <CrosshairSimple />
        <span className="ml-auto inline-flex flex-row items-center">
          <span className="mr-2">
            {isArr ? stop.join('%, ') : stop ?? _pos}%
          </span>
          {isArr ? (
            <button
              onClick={() =>
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type: 'linear',
                      stops: allStops.map((s, i) =>
                        i === index ? [s[0], s[1], _pos] : s
                      ),
                    },
                  },
                })
              }
            >
              <MinusSquare />
            </button>
          ) : (
            <button
              onClick={() =>
                deHandler({
                  action: 'bkgd-update-layer',
                  payload: {
                    id: selectedLayer,
                    type: 'gradient',
                    props: {
                      type: 'linear',
                      stops: allStops.map((s, i) =>
                        i === index ? [s[0], s[1], [_pos, _pos]] : s
                      ),
                    },
                  },
                })
              }
            >
              <PlusSquare />
            </button>
          )}
        </span>
      </div>
      <StopInput
        stop={stop}
        selectedLayer={selectedLayer}
        index={index}
        allStops={allStops}
      />
    </div>
  )
}

export default GradientStop
