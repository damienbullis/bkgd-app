import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
  Mock,
} from 'bun:test'
import SubStore from './subStore'

describe('SubStore', () => {
  let subStore: SubStore<number>
  let callbackMock: Mock<() => void>

  beforeEach(() => {
    callbackMock = mock(() => null)
    subStore = new SubStore(42)
  })

  afterEach(() => {
    callbackMock.mockClear()
  })

  it('able to unsubscribe', () => {
    const unsubscribe = subStore.subscribe(callbackMock)
    subStore.set(24)

    expect(callbackMock).toHaveBeenCalledTimes(1)

    unsubscribe()
    subStore.set(36)

    expect(callbackMock).toHaveBeenCalledTimes(1)
  })

  it('able to subscribe & publish changes', () => {
    const unsubscribe = subStore.subscribe(callbackMock)

    subStore.set(24)

    expect(callbackMock).toHaveBeenCalledTimes(1)
    subStore.set(42)

    expect(callbackMock).toHaveBeenCalledTimes(2)
    unsubscribe()
  })

  it('able to get the current value', () => {
    const value = subStore.get()

    expect(value).toBe(42)
  })
})
