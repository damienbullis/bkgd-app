import { useBkgdsCount } from '@state/global'
import { Bkgds, bkgdsSchema } from '../../components/Nav/bkgdSchemas'
import { useEffect, useMemo, useState } from 'react'

const getInitialState = (): Bkgds => {
  // check local storage for bkgds
  const bkgds = localStorage.getItem('bkgds') || '[]'
  try {
    return bkgdsSchema.parse(JSON.parse(bkgds))
  } catch (e) {
    console.error(e, bkgds)
    return []
  }
}

const useLocalStorage = (id?: string) => {
  const [count] = useBkgdsCount()
  const [bkgds, setBkgds] = useState<Bkgds>(getInitialState())
  useEffect(() => {
    if (count === 0) return
    setBkgds(getInitialState())
  }, [count])

  return useMemo(
    () => ({ isSaved: bkgds.some((b) => b.id === id), bkgds }),
    [bkgds, id]
  )
}

export default useLocalStorage
