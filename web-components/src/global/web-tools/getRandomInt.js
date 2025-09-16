/**
 * Get a random integer between two numbers
 * @example
 * const randomInt = getRandomInt(0, 100) // <-- will return a random integer between min and max
 *
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @param {number} [min=0]
 * @param {number} [max=100]
 * @return {*} 
 */
function getRandomInt(min = 0, max = 100) {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = getRandomInt 
