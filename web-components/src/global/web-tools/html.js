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

module.exports = html 
