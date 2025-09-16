/**
 * Short hand for document.querySelector
 * @example
 * const btn = select('#button-id')
 * btn.addEventListener('click', () => console.log('clicked'))
 * 
 * select('.modal').addEventListener('accepted', event => console.log(event))
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @param {string} selector
 * @param {HTMLElement} [scope=document]
 * @return {HTMLElement} 
 */
function select(selector, scope = document) {
  return scope.querySelector(selector)
}


module.exports = select 
