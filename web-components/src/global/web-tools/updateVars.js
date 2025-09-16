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

module.exports = updateVars
