import SubStore from './subStore'

const ActiveLayerID = new SubStore('')

const Visible = new SubStore(true)

const Layer = {
  ActiveLayerID,
}

const UI = {
  Visible,
}

export { Layer, UI }
