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

/* split */


/**
 * Create an HTML Node from a template string
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @example
 * const message = 'hello`
 * const template = html`<div>${hello}</div>`
 * document.body.appendChild(template)
 * 
 * @param {Array<string>} templates
 * @param {Array<string|number>} values
 * @return {Node} 
 */
function html(templates, ...values) {
  const template = document.createElement('template')
  let str = ''
  templates.forEach((template, index) => {
    str += template
    str = values[index] ? str + values[index] : str
  })
  if (str.match(/[^{}]*(?=\})/g)) {
    const regexRes = Array.from(str.matchAll(/[^{\}]+(?=})/g))
    regexRes.forEach(
      (key) =>
      (str = str.replace(
        `({${key}})`,
        `<span class="variable ${key}-var" data-key="${key}">${key}</span>`,
      )),
    )
  }

  template.innerHTML = str.trim()
  return template.content.cloneNode(true)
}

/* split */

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

/* split */

/**
 * Update the value of a component property in the html if you use wrap it in ({})
 * Variables will update every time you call the updateVars function
 * 
 * @author Diego Torres
 * @since 2023-01-10
 * @version 1.0.0
 * 
 * @example
 * class MyComponent extends HTMLElement {
 *   name = '????'
 *   constructor() {
 *     super()
 *     this.attachShadow({ mode: 'open' })
 *     this.shadowRoot.appendChild(html`<div>Hello ({name})</div>`)
 *     setTimeout(() => {
 *       this.name = 'World'
 *       updateVars(this) // <-- this will update the value of the variable
 *     })
 *   }
 * }
 *
 * @param {HTMLElement} component
 */
function updateVars(component) {
  const variables = Array.from(
    component.shadowRoot.querySelectorAll('.variable'),
  )
  variables.forEach((variable) =>
    Array.from(variable.classList)
      .filter((item) => item !== 'variable')
      .forEach((varName) => {
        const property = varName.replace('-var', '')
        variable.textContent = component[property]
      }),
  )
}

/* split */

/**
 * This is an attemp to dinamically render loops like angular or react
 * Needs a more work
 *
 * @author Diego Torres
 * @since 2023-01-10
 * @version 0.0.1
 * 
 * @param {HTMLElement} component
 */
function renderForLoops(component) {
  const templates = Array.from(
    component.shadowRoot.querySelectorAll('template'),
  )
  templates.forEach((template) => console.log(template.dataset))
}

/* split */

/**
 * Help parce gql commands/queries
 * still under development
 *
 * @author Diego Torres
 * @since 2023-01-10
 * @version 0.1.0
 * 
 * @param {Array<string>} templates
 * @param {Array<string|number>} values
 * @return {*} 
 */
function gql(templates, ...values) {
  let str = ''
  templates.forEach((template, index) => {
    str += template
    str = values[index] ? str + values[index] : str
  })
  return str.trim()
}

/* split */

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

/* split */

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

/* split */

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

/* split */

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
function getRandomInt(min=0, max=100) {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* split */

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

/* split */


module.exports = {
  html,
  mapComponentEvents,
  renderForLoops,
  sleep,
  updateVars,
  gql,
  registerTriggers,
  select,
  selectAll,
  getRandomInt,
  getRandomItem,
}
