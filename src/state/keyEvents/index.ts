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
      if (event.altKey) {
        this.state.altKey = true
      } else if (event.ctrlKey) {
        this.state.ctrlKey = true
      } else if (event.metaKey) {
        this.state.ctrlKey = true
      } else if (event.shiftKey) {
        this.state.shiftKey = true
      }
      this.state.key = event.key
      this.publish()
    })

    document.addEventListener('keyup', (event) => {
      if (event.altKey) {
        this.state.altKey = false
      } else if (event.ctrlKey) {
        this.state.ctrlKey = false
      } else if (event.metaKey) {
        this.state.ctrlKey = false
      } else if (event.shiftKey) {
        this.state.shiftKey = false
      }
      this.state.key = ''
      this.publish()
    })
  }
}

const KeyEventsContext = createContext<KeyboardEvents>(new KeyboardEvents())
const KeyEventsProvider = KeyEventsContext.Provider

export { KeyEventsContext, KeyEventsProvider, KeyboardEvents }
