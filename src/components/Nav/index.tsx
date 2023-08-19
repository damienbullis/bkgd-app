import {
  ImageSquare,
  MinusCircle,
  PlusCircle,
  Question,
} from '@phosphor-icons/react'
import { useSearch } from '@tanstack/router'
import { useLocalStorage } from '@state/hooks'
import { EventHandler } from '@state/events'
import { Button, Shine } from '@shared'
import { Show, makeID } from '@utils'

import { useBkgdSelected } from './_helpers'
import { Bkgd } from './bkgdSchemas'
import styles from './_.module.css'

const updateClasslist = (action: keyof DOMTokenList, id: string) => {
  const bkgdBtn = document.querySelector<HTMLButtonElement>(`#bkgd_btn_${id}`)
  if (bkgdBtn) {
    if (action === 'add') {
      bkgdBtn.classList.add(styles.selected)
    } else {
      bkgdBtn.classList.remove(styles.selected)
    }
  }
}

export default function Nav() {
  const [bkgdSelected, setBkgdSelected] = useBkgdSelected()
  const { id, layerData, layerStack } = useSearch({ from: '/' })
  const { isSaved, bkgds } = useLocalStorage(id)

  //#region Handlers
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
        updateClasslist('remove', `#bkgd_btn_${prevID}`)

        EventHandler({
          action: 'load-bkgd',
          payload: { bkgd },
        })

        // Reset the selected bkgd
        return ''
      } else {
        updateClasslist('add', `#bkgd_btn_${bkgd.id}`)
        // Set the selected bkgd
        return bkgd.id
      }
    })
  }
  //#endregion

  console.log({ isSaved, id, bkgdSelected, bkgds })
  return (
    <nav id="nav" className={styles.wrap}>
      <div className={styles.logo}>
        <Shine>BKGD</Shine>
      </div>
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
              <Show show={bkgdSelected === b.id}>
                <div
                  className={styles.delete}
                  onClick={(e) => {
                    e.stopPropagation()
                    EventHandler({
                      action: 'delete-bkgd',
                      payload: { bkgd: b },
                    })
                  }}
                >
                  <MinusCircle size={32} />
                </div>
              </Show>
            </Button>
          </li>
        ))}
        <Show show={layerStack.length > 0}>
          <li className="clr">
            <Button title="Save" onClick={() => saveHandler()}>
              <PlusCircle size={32} />
            </Button>
          </li>
        </Show>
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
