function renderStringProperties (properties) {
  let props = ''
  properties.forEach((prop, index) => {
    if (index === properties.length - 1) {
      props += prop
    } else {
      props += `${prop}, `
    }
  })
  return props
}

function getBeautify (code) {
  return require('js-beautify').js(code, {
    indent_size: 2,
    space_after_named_function: true,
    space_after_anon_function: true
  })
}

module.exports = {
  renderStringProperties,
  getBeautify
}
