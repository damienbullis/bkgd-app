// Define the store class
class SubStore<StoreT, CallbackT extends (args: StoreT) => void> {
  constructor(private store: StoreT) {}
  subscribers: CallbackT[] = [];

  subscribe(callback: CallbackT) {
    this.subscribers.push(callback);
    return [this.store, this.unsubscribe.bind(this, callback)];
  }

  unsubscribe(callback: CallbackT) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
  }

  state() {
    return this.store;
  }

  setState(data: StoreT) {
    for (const callback of this.subscribers) {
      callback(data);
    }
    this.store = data;
  }
}

export default SubStore;