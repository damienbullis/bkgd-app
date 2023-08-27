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
  ChartPolar,
  CircleHalf,
  FrameCorners,
  MapPin,
  Repeat,
} from '@phosphor-icons/react'

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

const LayerControls = () => {
  const { layers, selectedLayer } = useLayers()
  const {
    type,
    props,
    blendMode,
    opacity,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
  } = useMemo(() => {
    return layers.find((l) => l?.id === selectedLayer) || FALLBACK
  }, [layers, selectedLayer])

  return (
    <div className="grid min-w-[300px] grid-flow-row gap-2 ">
      {type === 'gradient' && <GradientType typeProps={props} />}
      {type === 'noise' && <NoiseType typeProps={props} opacity={opacity} />}
      {type === 'solid' && <ColorType typeProps={props} opacity={opacity} />}
      <div className="grid grid-flow-col place-content-stretch justify-items-center gap-2 text-2xl">
        <div className="inline-grid w-full cursor-pointer items-center justify-center rounded-lg transition-all hover:ring-2 hover:ring-sky-500">
          <CircleHalf />
        </div>
        <FrameCorners />
        <MapPin />
        <Repeat />
      </div>
      <Select
        label="Blend Mode"
        id="blendMode"
        options={blendModesOptions}
        value={blendMode}
      />
      <BackgroundSize value={backgroundSize} />
      <BackgroundPosition value={backgroundPosition} />
      <Select
        label="Background Repeat"
        id="backgroundRepeat"
        options={repeatOptions}
        value={backgroundRepeat}
      />
    </div>
  )
}

export default LayerControls
