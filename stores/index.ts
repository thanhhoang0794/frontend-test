import AuthStore from 'stores/authStore'
import TestStore from 'stores/testStore'
import SpinnerStore from './spinnerStore'

export class RootStore {
  testStore: TestStore
  authStore: AuthStore
  spinnerStore: SpinnerStore

  constructor() {
    this.testStore = new TestStore(this)
    this.authStore = new AuthStore(this)
    this.spinnerStore = new SpinnerStore(this)
  }
}

export const rootStore = new RootStore()
