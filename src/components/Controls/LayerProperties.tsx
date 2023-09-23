import { useMemo } from 'react'
import { Select } from '@shared'
import { useLayers } from '@state/hooks'

import BackgroundPosition from './PropertyInputs/BackgroundPosition'
import BackgroundSize from './PropertyInputs/BackgroundSize'
import ColorType from './PropertyInputs/ColorType'
import NoiseType from './PropertyInputs/NoiseType'

import GradientType from './PropertyInputs/GradientType'
import { ArrowsOut, FrameCorners, Repeat, Unite } from '@phosphor-icons/react'
import { Tab } from '@headlessui/react'
import { LayerType } from '@types'

const blendModesOptions = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const repeatOptions = [
  'repeat',
  'repeat-x',
  'repeat-y',
  'no-repeat',
  'space',
  'round',
]

const FALLBACK = {
  id: 'test',
  type: 'solid',
  props: {
    color: '#000000',
  },
  opacity: 100,
  blendMode: 'normal',
  backgroundPosition: '0% 0%',
  backgroundSize: 'auto',
  backgroundRepeat: 'repeat',
} satisfies LayerType

// Some notes

// 1. Change the design of the additional layer properties to be instead a
// single button that opens some sort of popover with all the additional properties?

function PropTab({ children }: { children: React.ReactNode }) {
  return (
    <Tab
      className="flex w-[1fr] flex-row items-center justify-center rounded-md border-none p-2 
      outline-none transition active:scale-95 ui-active:w-full ui-active:text-pink-500"
    >
      {children}
    </Tab>
  )
}

function AdditionalProperties({
  props,
}: {
  props: Pick<
    LayerType,
    'blendMode' | 'backgroundPosition' | 'backgroundSize' | 'backgroundRepeat'
  >
}) {
  const { blendMode, backgroundPosition, backgroundSize, backgroundRepeat } =
    props

  return (
    <>
      <Tab.Group>
        <Tab.List className="my-3 grid grid-flow-col">
          <PropTab>
            <Unite className="text-lg" />
            <p className="mx-2 whitespace-nowrap ui-selected:visible ui-not-selected:hidden">
              Blend Mode
            </p>
          </PropTab>
          <PropTab>
            <FrameCorners className="text-lg" />
            <p className="mx-2 whitespace-nowrap ui-selected:visible ui-not-selected:hidden">
              Size
            </p>
          </PropTab>
          <PropTab>
            <ArrowsOut className="text-lg" />
            <p className="mx-2 whitespace-nowrap ui-selected:visible ui-not-selected:hidden">
              Position
            </p>
          </PropTab>
          <PropTab>
            <Repeat className="text-lg" />
            <p className="mx-2 whitespace-nowrap ui-selected:visible ui-not-selected:hidden">
              Repeat
            </p>
          </PropTab>
        </Tab.List>
        <Tab.Panels className="max-w-full">
          <Tab.Panel>
            <Select
              id="blendMode"
              options={blendModesOptions}
              value={blendMode || 'normal'}
            />
          </Tab.Panel>
          <Tab.Panel>
            <BackgroundSize value={backgroundSize} />
          </Tab.Panel>
          <Tab.Panel>
            <BackgroundPosition value={backgroundPosition} />
          </Tab.Panel>
          <Tab.Panel>
            <Select
              id="backgroundRepeat"
              options={repeatOptions}
              value={backgroundRepeat || 'repeat'}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

const LayerControls = () => {
  const { layers, selectedLayer } = useLayers()
  const layer = useMemo(() => {
    return layers.find((l) => l?.id === selectedLayer) || FALLBACK
  }, [layers, selectedLayer])

  const { type, props, opacity } = layer

  return (
    <div className="w-96">
      {type === 'gradient' && <GradientType typeProps={props} />}
      {type === 'noise' && <NoiseType typeProps={props} opacity={opacity} />}
      {type === 'solid' && <ColorType typeProps={props} opacity={opacity} />}
      <hr className="m-4 mb-2 border-gray-300 opacity-10" />
      <AdditionalProperties props={layer} />
    </div>
  )
}

export default LayerControls
