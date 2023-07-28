class SubStore<
  StoreT,
  CallbackT extends (data: StoreT) => void = (data: StoreT) => void
> {
  private store: StoreT
  private subscribers: CallbackT[] = []
  constructor(store: StoreT) {
    this.store = store
  }

  subscribe(callback: CallbackT) {
    this.subscribers.push(callback)
    return this.unsubscribe.bind(this, callback)
  }

  private unsubscribe(callback: CallbackT) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    )
  }

  private publish(data: StoreT) {
    for (const callback of this.subscribers) {
      callback(data)
    }
  }

  get() {
    return this.store
  }

  set(data: StoreT) {
    this.publish(data)
    this.store = data
  }
}

export default SubStore
