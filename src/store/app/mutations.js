import { LocalStorage } from 'quasar'

export function ping (state, data) {
  state.status = data
}

export function step (state, step) {
  console.log('heimdall_setup: ' + step)
  LocalStorage.set('heimdall_setup', step)
  state.setup.step = step
}

export function setUser (state, user) {
  state.user = user
}

export function logout (state) {
  state.user = null
}

export function users (state, data) {
  state.users = data
}
