import { MinusCircle, PlusCircle, Question } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button, Shine } from '@shared'
import styles from './_.module.css'
import { makeID } from '@utils'
import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '@tanstack/router'
import z from 'zod'
import { LayerSchema } from '../Layers/LayerTypeSchema'
import { useBkgdsCount } from '@state/global'

const bkgdSchema = z
  .array(
    z.object({
      id: z.string(),
      name: z.string().default('Untitled'),
      layers: z.array(LayerSchema),
      createdAt: z.string().default(() => new Date().toJSON()),
      updatedAt: z.string().default(() => new Date().toJSON()),
    })
  )
  .catch((e) => {
    console.error(e)
    return []
  })
  .default([])

type Bkgd = z.infer<typeof bkgdSchema>

const getInitialState = (): Bkgd => {
  // check local storage for bkgds
  const bkgds = localStorage.getItem('bkgds') || '[]'
  try {
    return bkgdSchema.parse(JSON.parse(bkgds))
  } catch (e) {
    console.error(e, bkgds)
    return []
  }
}

const useSearchId = () => {
  const { id } = useSearch({ from: '/' })
  return useMemo(() => id, [id])
}

const useLocalStorage = () => {
  const id = useSearchId()
  const [count] = useBkgdsCount()
  const [bkgds, setBkgds] = useState<Bkgd>(getInitialState())
  useEffect(() => {
    if (count === 0) return
    setBkgds(getInitialState())
  }, [count])

  return {
    isSaved: bkgds.some((b) => b.id === id),
    bkgdId: id,
    bkgds,
  }
}

export default function Nav() {
  const { isSaved, bkgdId, bkgds } = useLocalStorage()
  console.log({ isSaved, bkgdId, bkgds })

  const saveHandler = (id?: string) => {
    let _id = id
    if (!_id) {
      _id = makeID()
    }
    const next = bkgds.filter((b) => b.id !== _id)
    next.push({
      id: _id,
      name: 'Untitled',
      layers: [],
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
    })
    const json = JSON.stringify(next)
    console.log('Saving', { _id, json: JSON.parse(json) })
    localStorage.setItem('bkgds', json)

    EventHandler({
      action: 'save-bkgd',
      payload: { id: _id },
    })
  }
  return (
    <nav id="nav" className={styles.wrap}>
      <span>
        <div className={styles.logo}>
          <Shine>BKGD</Shine>
        </div>
      </span>
      {/* TODO: 
        ADD: the saved bkgds list here
      */}
      <ul className="clr">
        {/* This will be visible if nav id is saved in local storage and we are on it? */}
        <li className="clr">
          <Button
            title="Delete"
            onClick={() =>
              EventHandler({
                action: 'delete-bkgd',
                payload: { id: '' },
              })
            }
          >
            <MinusCircle size={32} />
          </Button>
        </li>
        <li className="clr">
          <Button title="Save" onClick={() => saveHandler()}>
            <PlusCircle size={32} />
          </Button>
        </li>
      </ul>
      <ul className="clr">
        <li className="clr">
          <Button disabled title="Help">
            <Question size={32} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
