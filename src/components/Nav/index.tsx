import {
  MinusCircle,
  PlusCircle,
  Question,
  UserCircle,
} from '@phosphor-icons/react'
import { useSelectedLayer } from '@state/global'
import { EventHandler } from '@state/events'
import { Button, Shine } from '@shared'
import styles from './_.module.css'

export default function Nav() {
  const [selectedLayer] = useSelectedLayer()

  const saveHandler = () => {
    if (selectedLayer === '') return
    EventHandler({
      action: 'save-bkgd',
      payload: { id: selectedLayer },
    })
  }
  return (
    <nav id="nav" className={styles.wrap}>
      <span>
        <div className={styles.logo}>
          <Shine>BKGD</Shine>
        </div>
      </span>
      <ul className="clr">
        <li className="clr">
          <Button disabled title="Save" onClick={saveHandler}>
            <PlusCircle size={32} />
          </Button>
        </li>
        <li className="clr">
          <Button
            disabled
            title="Delete"
            onClick={() =>
              EventHandler({
                action: 'delete-bkgd',
                payload: { id: '1' },
              })
            }
          >
            <MinusCircle size={32} />
          </Button>
        </li>
      </ul>
      <ul className="clr">
        <li className="clr">
          <Button disabled title="Help">
            <Question size={32} />
          </Button>
        </li>
        <li className="clr">
          <Button disabled title="Settings">
            <UserCircle size={32} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
