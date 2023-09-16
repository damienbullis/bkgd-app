import { createContext } from 'react'

type KeyEventsState = {
  shiftKey: boolean
  ctrlKey: boolean
  altKey: boolean
  key: string
}
class KeyboardEvents {
  private state: KeyEventsState
  private subscribers: ((d: KeyEventsState) => void)[] = []
  constructor() {
    this.state = {
      shiftKey: false,
      ctrlKey: false,
      altKey: false,
      key: '',
    }
    this.setupKeyboardEvents()
  }

  public getState() {
    return this.state
  }

  public subscribe(callback: (d: KeyEventsState) => void) {
    this.subscribers.push(callback)
    return this.unsubscribe.bind(this, callback)
  }

  private unsubscribe(callback: (d: KeyEventsState) => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    )
  }

  private publish() {
    for (const callback of this.subscribers) {
      callback(this.state)
    }
  }

  private setupKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
      if (event.key.length === 1) {
        this.state.key = event.key
      } else {
        if (event.key === 'Control') this.state.ctrlKey = true
        if (event.key === 'Meta') this.state.ctrlKey = true
        if (event.key === 'Alt') this.state.altKey = true
        if (event.key === 'Shift') this.state.shiftKey = true
      }

      this.publish()
    })

    document.addEventListener('keyup', (event) => {
      if (event.key.length === 1) {
        this.state.key = ''
      } else {
        if (event.key === 'Control') this.state.ctrlKey = false
        if (event.key === 'Meta') this.state.ctrlKey = false
        if (event.key === 'Alt') this.state.altKey = false
        if (event.key === 'Shift') this.state.shiftKey = false
      }

      this.publish()
    })
  }
}

const KeyEventsContext = createContext<KeyboardEvents>(new KeyboardEvents())
export { KeyboardEvents, KeyEventsContext }
