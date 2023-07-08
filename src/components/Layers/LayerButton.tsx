import { List } from '../_shared'
import { LAYER_TYPES, LayerType } from './_helpers'

const LayerButtons = ({ layers }: { layers: LayerType[] }) => {
  return (
    <List>
      {layers.map((layer, i) => {
        const Icon = LAYER_TYPES[layer]
        return (
          <li key={i}>
            <Icon size={'1.618rem'} />
          </li>
        )
      })}
    </List>
  )
}

export { LayerButtons }
