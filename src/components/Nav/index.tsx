import {
  ArrowsOutSimple,
  Bug,
  GitBranch,
  ImageSquare,
  MinusCircle,
  PlusCircle,
  Question,
} from '@phosphor-icons/react'
import { useSearch } from '@tanstack/router'
import { useLocalStorage } from '@state/hooks'
import { EventHandler } from '@state/events'
import { Button, IconButton, ModalProvider, Shine } from '@shared'
import { Show, makeID } from '@utils'
import { Bkgd } from '@types'

import { useBkgdSelected } from './_helpers'
import router from '../../router'
import { Menu, Transition } from '@headlessui/react'
import HelpMenu from './HelpMenu'
import ShortcutModal from './ShortcutModal'
import NavButton from './NavButton'

const updateClasslist = (action: keyof DOMTokenList, id: string) => {
  const bkgdBtn = document.querySelector<HTMLButtonElement>(`#bkgd_btn_${id}`)
  if (bkgdBtn) {
    if (action === 'add') {
      bkgdBtn.setAttribute('aria-selected', 'true')
    } else {
      bkgdBtn.removeAttribute('aria-selected')
    }
  }
}
// Pass in the router from the app
export default function Nav() {
  const [bkgdSelected, setBkgdSelected] = useBkgdSelected()
  const { id, layerData, layerStack } = useSearch({ from: '/' })

  const {
    // isSaved,
    bkgds,
  } = useLocalStorage(id)

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

  return (
    <nav
      id="nav"
      className="z-0 col-start-3 col-end-4 row-start-1 row-end-3 inline-grid max-h-full
      select-none grid-cols-[auto] grid-rows-[auto_1fr_auto] content-center"
    >
      <a
        href={'/welcome' + router.state.currentLocation.searchStr}
        className="relative m-0 cursor-pointer overflow-hidden  bg-gradient-to-br from-fuchsia-500 to-green-500 bg-clip-text p-4 py-0 text-center text-[2rem] tracking-tighter text-transparent transition-transform before:box-content hover:scale-105 active:scale-100"
        style={{ fontFamily: 'var(--font-impact)' }}
      >
        BKGD
        <span className="absolute inset-0">
          <Shine>BKGD</Shine>
        </span>
      </a>
      <ul className="mt-4 inline-grid auto-rows-max items-start justify-items-center gap-2 p-4 pt-0">
        {bkgds.map((b) => (
          <NavButton
            key={b.id}
            bkgd={b}
            bkgdHandler={bkgdHandler}
            bkgdSelected={bkgdSelected}
          />
        ))}
        <Show show={layerStack.length > 0}>
          <li className="inline-grid place-content-center">
            <Button
              title="Save"
              onClick={() => saveHandler()}
              className="rounded-lg p-2 filter backdrop-blur-md backdrop-brightness-50 hover:backdrop-brightness-75"
            >
              <PlusCircle size={32} />
            </Button>
          </li>
        </Show>
      </ul>
      <ModalProvider>
        <ShortcutModal />
        <HelpMenu />
      </ModalProvider>
    </nav>
  )
}
