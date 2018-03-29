export const formatBuffer = function (buffer) {
  if (!(buffer instanceof Buffer)) {
    return ''
  }
  const strHex = buffer.toString('hex').toUpperCase()
  let output = ''
  let i = 0
  for (const codePoint of strHex) {
    output += codePoint + (i % 2 !== 0 && i !== strHex.length - 1 ? ' ' : '')
    i++
  }
  return output
}

export const isNumber = function (value) {
  return (!isNaN(value) && typeof value === 'number') || value instanceof Number
}

export const isString = function (value) {
  return typeof value === 'string' || value instanceof String
}
