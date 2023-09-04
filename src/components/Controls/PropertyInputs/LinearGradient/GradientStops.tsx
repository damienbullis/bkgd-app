import GradientStop from './GradientStop'
import { GradientStopsType } from './_helpers'

const LinearGradientStops = ({
  stops = [],
  selectedLayer,
}: {
  stops: GradientStopsType[]
  selectedLayer: string
}) => {
  return (
    <div className="justify-starts flex w-full flex-col items-stretch justify-stretch">
      {stops.map(([color, opacity, stop], i) => (
        <GradientStop
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

export default LinearGradientStops
