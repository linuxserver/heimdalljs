const net = require('net')

module.exports = function getRootDomain(url) {
  const domain = new URL(url).hostname

  if (net.isIP(domain)) {
    return domain
  }

  const elems = domain.split('.')
  const iMax = elems.length - 1
  return elems.splice(elems.length >= 3 && (elems[iMax] + elems[iMax - 1]).length <= 5 ? -3 : -2).join('.')
}
