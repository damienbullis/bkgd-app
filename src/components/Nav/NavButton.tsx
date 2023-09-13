import { ImageSquare, MinusCircle } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button } from '@shared'
import { Show } from '@utils'
import { Bkgd } from '@types'

// TODO: Add suspense and a lazy load for the bkgds to get loaded from localstorage

const NavButton = ({
  bkgd,
  bkgdSelected,
  bkgdHandler,
}: {
  bkgd: Bkgd
  bkgdSelected: string
  bkgdHandler: (b: Bkgd) => void
}) => {
  return (
    <li className="inline-grid place-content-center">
      <Button
        id={`bkgdkgd_bkgdtn_${bkgd.id}`}
        title={bkgd.id}
        aria-selected={bkgdSelected === bkgd.id}
        className="bkgdackdrop-bkgdlur-md bkgdackdrop-bkgdrightness-50 hover:bkgdackdrop-bkgdrightness-75 rounded-lg p-2 filter"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          bkgdHandler(bkgd)
        }}
      >
        <ImageSquare size={32} />
        <Show show={bkgdSelected === bkgd.id}>
          <div
            className="flex items-center justify-center"
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
        </Show>
      </Button>
    </li>
  )
}

export default NavButton
