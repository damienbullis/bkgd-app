import { ImageSquare, MinusCircle } from '@phosphor-icons/react'
import { EventHandler } from '@state/events'
import { Button } from '@shared'
import { Bkgd } from '@types'

const NavButton = ({
  id,
  bkgd,
  bkgdSelected,
  bkgdHandler,
}: {
  id: string
  bkgd: Bkgd
  bkgdSelected: string
  bkgdHandler: (b: Bkgd) => void
}) => {
  return (
    <li className="inline-grid place-content-center">
      <Button
        title={bkgd.id}
        aria-selected={bkgdSelected === bkgd.id || id === bkgd.id}
        className="group relative rounded-lg p-2 filter backdrop-blur-md backdrop-brightness-50 hover:backdrop-brightness-75"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          bkgdHandler(bkgd)
        }}
      >
        <ImageSquare size={32} />
        <div
          className="absolute -right-2 -top-2 flex h-6 w-6 scale-50 cursor-pointer items-center justify-center rounded-full bg-gray-900 bg-opacity-70 text-xl text-white opacity-0 transition-all hover:bg-red-600 active:bg-red-700 group-aria-selected:scale-100 group-aria-selected:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            EventHandler({
              action: 'delete-bkgd',
              payload: { bkgd },
            })
          }}
        >
          <MinusCircle />
        </div>
      </Button>
    </li>
  )
}

export default NavButton
