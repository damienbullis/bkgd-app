import { useEffect, useState } from 'react'

const useBkgdSelected = () => {
  const [bkgdSelected, setBkgdSelected] = useState<string>('')
  // Blur side effect
  useEffect(() => {
    // Create a click handler to deselect the selected bkgd on blur
    const handler = (e: MouseEvent) => {
      const target = e.target

      if (target instanceof HTMLElement && target.id !== 'nav') {
        setBkgdSelected('')
      }
    }
    // if the background isnt selected, remove any previous handler
    if (!bkgdSelected) window.removeEventListener('click', handler)
    else window.addEventListener('click', handler)

    // on unmount, remove any previous handler
    return () => window.removeEventListener('click', handler)
  }, [bkgdSelected])

  return [bkgdSelected, setBkgdSelected] as const
}

export { useBkgdSelected }
