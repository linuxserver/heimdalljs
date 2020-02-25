import { LocalStorage } from 'quasar'

export function status (state, data) {
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

export function setLoginStatus (state, status) {
  state.loginStatus = status
}

export function logout (state) {
  state.user = null
  state.loginStatus = null
}

export function users (state, data) {
  state.users = data
}

export function tab (state, data) {
  state.tab = data
}

export function adminApps (state, data) {
  state.admin_apps = data
}
export function adminUsers (state, data) {
  state.admin_users = data
}
export function adminProxies (state, data) {
  state.admin_proxies = data
}

export function settings (state, data) {
  state.settings = data
}
