/**
 * Similar to document.querySelectorAll, but returns an array instead of a nodeList
 * 
 * @example
 * selectAll('.modal')
 *   .forEach(modal => modal.addEventListener('accepted', event => console.log(event))
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 *
 * @param {string} selector
 * @param {HTMLElement} [scope=document]
 * @return {HTMLElement} 
 */
function selectAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector))
}

module.exports = selectAll
