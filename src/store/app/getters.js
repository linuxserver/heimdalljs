export function getBackground(state) {
  const background = state.settings.background
  if (background === null || background.type === null || background.type === 'none') {
    return ''
  }
  if (background.type === 'background_image') {
    return 'background-image: url(' + process.env.BACKEND_LOCATION + background.location + ')'
  }
  if (background.type === 'colour') {
    const colour1 = background.colour1
    const colour2 = background.colour2
    const gradient = background.gradient
    const degrees = background.degrees || 0
    if (colour2 === undefined || colour2 === '') {
      return 'background: ' + colour1
    } else {
      if (gradient === 'radial') {
        return 'background: ' + colour1 + '; background:radial-gradient(circle, ' + colour1 + ' 0%, ' + colour2 + ' 100%);'
      } else {
        return 'background: ' + colour1 + '; background:linear-gradient(' + degrees + 'deg, ' + colour1 + ' 0%, ' + colour2 + ' 100%);'
      }
    }
  }
}
