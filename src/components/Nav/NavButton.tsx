import { ImageSquare, MinusCircle } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button } from '@shared'
import { Show } from '@utils'
import { Bkgd } from '@types'

// TODO: update the delete button styles and location
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
        id={`bkgd_btn_${bkgd.id}`}
        title={bkgd.id}
        aria-selected={bkgdSelected === bkgd.id}
        className="rounded-lg p-2 filter backdrop-blur-md backdrop-brightness-50 hover:backdrop-brightness-75"
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
