import { useMemo } from 'react'
import { Select } from '@shared'
import { useLayers } from '@state/hooks'

import { LayerType } from '../Layers/LayerTypeSchema'
import BackgroundPosition from './PropertyInputs/BackgroundPosition'
import BackgroundSize from './PropertyInputs/BackgroundSize'
import ColorType from './PropertyInputs/ColorType'
import NoiseType from './PropertyInputs/NoiseType'

import GradientType from './PropertyInputs/GradientType'
import {
  CircleHalf,
  FrameCorners,
  MapPin,
  Repeat,
  Unite,
} from '@phosphor-icons/react'
import { Tab } from '@headlessui/react'

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
    <Tab.Group>
      <Tab.List className="flex flex-row items-center justify-around">
        <Tab className="ui-selected:text-fuchsia-500 ui-not-selected:text-white">
          <Unite size="2em" />
        </Tab>
        <Tab className="ui-selected:text-fuchsia-500 ui-not-selected:text-white">
          <FrameCorners size="2em" />
        </Tab>
        <Tab className="ui-selected:text-fuchsia-500 ui-not-selected:text-white">
          <MapPin size="2em" />
        </Tab>
        <Tab className="ui-selected:text-fuchsia-500 ui-not-selected:text-white">
          <Repeat size="2em" />
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Select
            label="Blend Mode"
            id="blendMode"
            options={blendModesOptions}
            value={blendMode}
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
            label="Background Repeat"
            id="backgroundRepeat"
            options={repeatOptions}
            value={backgroundRepeat}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

const LayerControls = () => {
  const { layers, selectedLayer } = useLayers()
  const layer = useMemo(() => {
    return layers.find((l) => l?.id === selectedLayer) || FALLBACK
  }, [layers, selectedLayer])

  const { type, props, opacity } = layer

  return (
    <div className="grid w-96 grid-flow-row gap-2 ">
      {type === 'gradient' && <GradientType typeProps={props} />}
      {type === 'noise' && <NoiseType typeProps={props} opacity={opacity} />}
      {type === 'solid' && <ColorType typeProps={props} opacity={opacity} />}

      <AdditionalProperties props={layer} />
    </div>
  )
}

export default LayerControls
