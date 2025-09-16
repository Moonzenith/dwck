/**
 * Get a random item from an array
 *
 * @example
 * const items = ['a', 'b', 'c']
 * const selected = getRandomItem(items) // <-- will return a random item from the array
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @param {Array<*>} array
 * @return {*} 
 */
function getRandomItem(array) {
  const randomInt = getRandomInt(0, array.length - 1)
  const item = array.splice(randomInt, 1)
  return item.pop()
}


module.exports = getRandomItem 