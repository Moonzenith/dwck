/**
 * registrer triggers for an element
 * this is what enable the trigger="css_selector" and trigger-event="click"
 * on elements like <app-modal trigger="css_selector" and trigger-event="click">
 * @example
 * class MyComponent extends HTMLElement {
 *   constructor() {
 *     super()
 *     this.attachShadow({ mode: 'open' })
 *     this.shadowRoot.appendChild(html`<div>Hello World!/div>`)
 *     registerTriggers(this, (event) => console.log(event))
 *   }
 * }
 * ...
 * // call it from html like this
 * <app-modal trigger="css_selector" trigger-event="click">
 *
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @param {HTMLElement} element
 * @param {Function} callback
 */
function registerTriggers(element, callback) {
  // looking for the trigger attribute <app-modal trigger="css_selector" on="click">
  if (!element.hasAttribute('trigger')) return
  const selector = element.getAttribute('trigger')
  console.log('selector', selector)
  if (!selector || selector === '#' || selector === '.') return

  const documentTriggers = Array.from(document.querySelectorAll(selector))
  const internalTriggers = Array.from(element.parentNode.querySelectorAll(selector))

  console.log('element: ', element)
  console.log('element: ', element.parentNode.querySelectorAll(selector))

  // triggers within the shadow dom and externals, like the document
  const triggers = [...documentTriggers, ...internalTriggers]
  console.log('triggers', triggers)
  console.log('internalTriggers', internalTriggers)

  if (!triggers) return
  let triggerEvent = element.getAttribute('on') || element.getAttribute('event')


  // registering individual triggers
  triggers.map((trigger) => {
    if (!triggerEvent) triggerEvent = trigger.DEFAULT_EVENT_NAME || 'click'
    console.log('triggerEvent', triggerEvent, trigger)
    trigger.addEventListener(triggerEvent, callback)
    // trigger.removeEventListener()
  })

  return function unregister() {
    triggers.map((trigger) => {
      if (!triggerEvent) triggerEvent = trigger.DEFAULT_EVENT_NAME || 'click'
      console.log('triggerEvent', triggerEvent, trigger)
      trigger.removeEventListener(triggerEvent, callback)
    })
  }
}


module.exports = registerTriggers 
