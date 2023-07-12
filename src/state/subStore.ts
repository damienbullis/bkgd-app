class SubStore<StoreT, CallbackT extends (args: StoreT) => void> {
  private store: StoreT
  private subscribers: CallbackT[] = []
  constructor(store: StoreT) {
    this.store = store
  }

  subscribe(callback: CallbackT) {
    this.subscribers.push(callback)
    return () => {
      this.unsubscribe(callback)
    }
  }

  private unsubscribe(callback: CallbackT) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    )
  }

  getState() {
    return this.store
  }

  setState(data: StoreT) {
    for (const callback of this.subscribers) {
      callback(data)
    }
    this.store = data
  }
}

export default SubStore
