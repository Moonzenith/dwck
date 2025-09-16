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

module.exports = gql 
