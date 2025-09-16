/**
 * Creates idle time for a given period of time (in millisecotds).
 * Return a promise, use .then() or use async await
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 *
 * @example
 * async funtion run() {
 *      console.log('starting function')
 *      await sleep()
 *      console.log('this will print after default time')
 * }
 *
 * @param {number} [time=300]
 * @returns {Promise}
 */
function sleep(time = 300) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports = sleep