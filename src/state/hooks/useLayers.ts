import { useSelectedLayer } from '@state/global'
import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

function useLayers() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const { layerData, layerStack } = useSearch({ from: '/' })
  const layers = useMemo(() => {
    return layerStack
      .map((layerId) => {
        const layer = layerData.find((layer) => layer.id === layerId)
        if (!layer) {
          return null
        }
        return layer
      })
      .filter((layer) => layer !== null)
  }, [layerData, layerStack])

  return {
    layers,
    selectedLayer,
    setSelectedLayer,
  }
}

export default useLayers
