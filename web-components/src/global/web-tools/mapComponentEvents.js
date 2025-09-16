/**
 * allow webcomponents to sync methods to handlers directly on the html
 * @example
 * class MyComponent extends HTMLElement {
 *   constructor() {
 *     super()
 *     this.attachShadow({ mode: 'open' })
 *     this.shadowRoot.appendChild(html`<button onclick="doSomething">click me</button>`)
 *   }
 *   doSomething(event) {
 *     console.log('clicked', event)
 *   }
 * }
 *
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 *
 * @param {HTMLElement} component
 */
function mapComponentEvents(component) {
  const EVENT_NAMES = [
    'onclick',
    'ondblclick',
    'onabort',
    'onanimationcancel',
    'onauxclick',
    'onchange',
    'onclose',
    'onkeydown',
    'onkeyup',
    'onkeypress',
    'onload',
    'onmouseleave',
    'onmouseenter',
    'onmousemove',
    'onmouseover',
  ]
  // log(component)
  EVENT_NAMES.map((eventName) => {
    Array.from(component.shadowRoot.querySelectorAll(`[${eventName}]`)).forEach(
      (handled) => {
        const handlerName = handled.getAttribute(eventName)
        handled.addEventListener(eventName.replace('on', ''), (event) => {
          component[handlerName](event)
          updateVars(component)
        })
        handled.removeAttribute(eventName)
      },
    )
  })
}

module.exports = mapComponentEvents 