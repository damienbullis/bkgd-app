import { useSelectedLayer } from '@state/global'
import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'

function useLayers() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const { layerData, layerStack } = useSearch({ from: '/' })
  const layers = useMemo(() => {
    return layerStack.map((layerId) => {
      return layerData.find((layer) => layer.id === layerId)
    })
  }, [layerData, layerStack])

  return {
    layers,
    selectedLayer,
    setSelectedLayer,
  }
}

export default useLayers
