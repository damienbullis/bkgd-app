import GradientStop from './GradientStop'
import { GradientStopsType } from './_helpers'

const GradientStops = ({
  stops = [],
  selectedLayer,
  type,
}: {
  stops: GradientStopsType[]
  selectedLayer: string
  type: 'linear' | 'radial' | 'conic'
}) => {
  return (
    <div className="justify-starts flex w-full flex-col items-stretch justify-stretch">
      {stops.map(([color, opacity, stop], i) => (
        <GradientStop
          type={type}
          key={i}
          index={i}
          color={color}
          opacity={opacity}
          stop={stop}
          allStops={stops}
          selectedLayer={selectedLayer}
        />
      ))}
    </div>
  )
}

export default GradientStops
