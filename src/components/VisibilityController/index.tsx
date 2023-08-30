import { useVisible } from '@state/global'

const HIDDEN = 'bkgd-hidden'

const VisibilityController = () => {
  const [visible] = useVisible()

  const footer = document.getElementById('footer')
  const nav = document.getElementById('nav')
  const controls = document.getElementById('controls')
  const layers = document.getElementById('layers')

  if (!footer || !nav || !controls || !layers) return null
  const targetMethod = visible ? 'add' : 'remove'
  footer.classList[targetMethod](HIDDEN)
  nav.classList[targetMethod](HIDDEN)
  controls.classList[targetMethod](HIDDEN)
  layers.classList[targetMethod](HIDDEN)

  return null
}

export default VisibilityController
