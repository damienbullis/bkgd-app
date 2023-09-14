import { useSelectedLayer } from '@state/global'
import { useSearch } from '@tanstack/router'
import { useMemo } from 'react'
import { LayerType } from '@types'

function useLayers() {
  const [selectedLayer, setSelectedLayer] = useSelectedLayer()
  const { layerData, layerStack } = useSearch({ from: '/' })
  const layers = useMemo(() => {
    return layerStack
      .map((layerId) => {
        return layerData.find((layer) => layer.id === layerId) || null
      })
      .filter(Boolean) as LayerType[]
  }, [layerData, layerStack])

  return {
    layers,
    selectedLayer,
    setSelectedLayer,
  }
}

export default useLayers
