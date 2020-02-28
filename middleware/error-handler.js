'use strict'

/**
 * This is middleware to catch and handle promise errors
 * from our async functions.
 */
module.exports = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
