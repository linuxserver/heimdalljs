export function tags (state) {
  let tags = []
  state.active.forEach((tile) => {
    if (tile.tags === null) return
    tags = mergeTags(tile.tags, tags)
  })
  return tags
}
function mergeTags (a, b) {
  return Array.from(new Set(a.concat(b)))
}
