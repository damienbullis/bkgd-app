import { useVisible } from '@state/global'
import { useState } from 'react'

type UI_ID_ENUM = 'nav' | 'footer' | 'controls' | 'layers'

const HIDDEN = 'ui-hidden'

const VisibilityController = () => {
  const [visible] = useVisible()

  console.log('VisibilityController', visible)

  const footer = document.getElementById('footer')
  const nav = document.getElementById('nav')
  const controls = document.getElementById('controls')
  const layers = document.getElementById('layers')

  if (!footer || !nav || !controls || !layers) return null
  console.log({ footer, nav, controls, layers })
  const targetMethod = visible ? 'add' : 'remove'
  footer.classList[targetMethod](HIDDEN)
  nav.classList[targetMethod](HIDDEN)
  controls.classList[targetMethod](HIDDEN)
  layers.classList[targetMethod](HIDDEN)

  return null
}

export default VisibilityController
