export function tags(state) {
  let tags = []
  state.active.forEach(tile => {
    if (tile.tags === null) return
    tags = mergeTags(tile.tags, tags)
  })
  return tags
}
export function allTags(state) {
  let tags = []
  state.all.forEach(tile => {
    if (tile.tags === null) return
    tags = mergeTags(tile.tags, tags)
  })
  return tags
}
function mergeTags(a, b) {
  return Array.from(new Set(a.concat(b)))
}

export function possibleApplications(state) {
  let apps = []
  if (state.possibleapps.length > 0) {
    apps = [...state.possibleapps]
    console.log(apps)
    apps.sort((a, b) => {
      return a.name === b.name ? 0 : +(a.name > b.name) || -1
    })
  }
  return apps
}

export function enhancedApplications(state) {
  const possible = possibleApplications(state)
  const result = possible.filter(application => application.enhanced === true && application.config !== undefined)

  return result
}
