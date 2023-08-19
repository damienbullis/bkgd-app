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
import { Bkgd, Bkgds, bkgdsSchema } from './bkgdSchemas'

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

const DeleteButton = ({ bkgd, show }: { bkgd: Bkgd; show: boolean }) => {
  return show ? (
    <div
      className={styles.delete}
      onClick={(e) => {
        e.stopPropagation()
        EventHandler({
          action: 'delete-bkgd',
          payload: { bkgd },
        })
      }}
    >
      <MinusCircle size={32} />
    </div>
  ) : null
}

export default function Nav() {
  const { id, layerData, layerStack } = useSearch({ from: '/' })
  const { isSaved, bkgds } = useLocalStorage(id)
  const [bkgdSelected, setBkgdSelected] = useState<string>('')
  const saveHandler = (id?: string) => {
    EventHandler({
      action: 'save-bkgd',
      payload: {
        bkgd: bkgds.find((b) => b.id === id) || {
          // Could clean this up
          id: makeID(),
          name: 'Untitled',
          layers: {
            layerData,
            layerStack,
          },

          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
        },
      },
    })
  }

  const bkgdHandler = (bkgd: Bkgd) => {
    setBkgdSelected((prevID) => {
      // If bkgd is selected, load it
      if (prevID === bkgd.id) {
        const bkgdBtn = document.querySelector<HTMLButtonElement>(
          `#bkgd_btn_${prevID}`
        )

        if (bkgdBtn) {
          bkgdBtn.classList.remove(styles.selected)
        }

        EventHandler({
          action: 'load-bkgd',
          payload: { bkgd },
        })

        // Reset the selected bkgd
        return ''
      } else {
        const bkgdBtn = document.querySelector<HTMLButtonElement>(
          `#bkgd_btn_${bkgd.id}`
        )
        if (bkgdBtn) {
          // Add the selected class to the button
          bkgdBtn.classList.add(styles.selected)
        }
        // Set the selected bkgd
        return bkgd.id
      }
    })
  }
  // Blur side effect
  useEffect(() => {
    // Create a click handler to deselect the selected bkgd on blur
    const handler = (e: MouseEvent) => {
      console.log('click', { e })
      const target = e.target as HTMLElement
      if (target.id !== 'nav') {
        setBkgdSelected('')
      }
    }
    // if the background isnt selected, remove any previous handler
    if (!bkgdSelected) window.removeEventListener('click', handler)
    else window.addEventListener('click', handler)

    // on unmount, remove any previous handler
    return () => window.removeEventListener('click', handler)
  }, [bkgdSelected])

  console.log({ isSaved, id, bkgdSelected, bkgds })
  return (
    <nav id="nav" className={styles.wrap}>
      <span
      // Remove this span
      >
        <div className={styles.logo}>
          <Shine>BKGD</Shine>
        </div>
      </span>
      <ul className="clr">
        {bkgds.map((b) => (
          <li key={b.id} className="clr">
            <Button
              id={`bkgd_btn_${b.id}`}
              title={b.id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                bkgdHandler(b)
              }}
            >
              <ImageSquare size={32} />
              <DeleteButton bkgd={b} show={bkgdSelected === b.id} />
            </Button>
          </li>
        ))}
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
