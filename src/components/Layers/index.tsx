import styles from './_.module.css'
import { Button, IconButton, List } from '../_shared'
import { useState } from 'react'
import { LayerButtons } from './LayerButtons'
import {
  Clipboard,
  DownloadSimple,
  Eye,
  EyeClosed,
  Icon,
  // Plus,
  // Trash,
} from '@phosphor-icons/react'
import { LayerPropsType, LayerEnum } from '@types'

const LiButton = ({
  icon,
  onClick,
}: {
  icon: Icon
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <li>
      <IconButton icon={icon} onClick={onClick} />
    </li>
  )
}

const VisibilityButton = () => {
  const [hide, setHide] = useState(false)
  return (
    <LiButton
      icon={hide ? EyeClosed : Eye}
      onClick={() => setHide((prev) => !prev)}
    />
  )
}

export default function Layers() {
  const [layers, setLayers] = useState<LayerPropsType<LayerEnum>[]>([])

  const layersList = ['solid'] satisfies LayerEnum[]

  // const addLayer = () => {
  //   setLayers((prev) => [...prev, randomLayer()])
  // }

  // const removeLayer = (index: number) => {
  //   setLayers((prev) => {
  //     const next = [...prev]
  //     prev.splice(index, 1)
  //     return next
  //   })
  // }

  return (
    <aside id="layers" className={styles.wrap}>
      <List>
        <LiButton
          icon={DownloadSimple}
          onClick={() => console.log('download')}
        />
        <LiButton icon={Clipboard} onClick={() => console.log('copy')} />
        <VisibilityButton />
        {/* <li>
          <Button onClick={() => addLayer()}>
            <Plus size={'1.618rem'} />
          </Button>
        </li>
        <li>
          <Button onClick={() => removeLayer(0)}>
            <Trash size={'1.618rem'} />
          </Button>
        </li> */}
      </List>
      <LayerButtons layers={layersList} />
    </aside>
  )
}
