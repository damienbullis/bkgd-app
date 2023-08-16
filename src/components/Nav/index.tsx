import {
  ImageSquare,
  MinusCircle,
  PlusCircle,
  Question,
} from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button, Shine } from '@shared'
import styles from './_.module.css'
import { makeID } from '@utils'
import { useEffect, useMemo, useState } from 'react'
import { useSearch } from '@tanstack/router'

import { useBkgdsCount } from '@state/global'
import { Bkgds, bkgdsSchema } from './bkgdSchemas'

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
    () => ({ isSaved: bkgds.some((b) => b.id === id), bkgdId: id, bkgds }),
    [bkgds, id]
  )
}

export default function Nav() {
  const { id, layerData, layerStack } = useSearch({ from: '/' })
  const { isSaved, bkgdId, bkgds } = useLocalStorage(id)
  const saveHandler = (id?: string) => {
    EventHandler({
      action: 'save-bkgd',
      payload: {
        bkgd: bkgds.find((b) => b.id === id) || {
          // Could clean this up
          id: makeID(),
          name: 'Untitled',
          layers: [
            {
              layerData,
              layerStack,
            },
          ],
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
      },
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
        {bkgds.map((b) => (
          <li key={b.id} className="clr">
            <Button
              title={b.id}
              onClick={() => {
                if (isSaved && b.id === bkgdId) {
                  EventHandler({
                    action: 'delete-bkgd',
                    payload: { bkgd: b },
                  })
                } else {
                  EventHandler({
                    action: 'load-bkgd',
                    payload: { bkgd: b },
                  })
                }
              }}
            >
              {isSaved && b.id === bkgdId ? (
                <MinusCircle size={32} />
              ) : (
                <ImageSquare size={32} />
              )}
            </Button>
          </li>
        ))}
        {/* This will be visible if nav id is saved in local storage and we are on it? */}
        {/* <li className="clr">
          <Button
            title="Delete"
            onClick={() =>
              EventHandler({
                action: 'delete-bkgd',
                payload: { id: bkgdId || bkgds[bkgds.length - 1]?.id },
              })
            }
          >
            <MinusCircle size={32} />
          </Button>
        </li> */}
        {/* TODO: Hide control if there are no layers */}
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
