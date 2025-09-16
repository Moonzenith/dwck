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

module.exports = renderForLoops 
