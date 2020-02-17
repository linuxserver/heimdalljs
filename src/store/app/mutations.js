export function ping (state, data) {
  state.status = data
}

export function step (state, data) {
  state.setup.step = data
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
