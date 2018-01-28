import producer from 'immer'

const privates = new WeakMap()

function defaultUpdate(state) {
  return state
}

export default class GameStates {
  constructor(baseState = {}) {
    privates.set(this, baseState)
  }

  get state() {
    return privates.get(this)
  }

  update(fn = defaultUpdate) {
    privates.set(this, producer(privates.get(this), fn))
  }
}
