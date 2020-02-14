export function ping (state, data) {
  state.status = data
}

export function step (state, data) {
  state.setup.step = data
}
