import {Base64} from 'js-base64'
import {isNumber, isString} from './util'
import {ignore} from './symbol'

export const regPackageDecode = function (regPackage) {
  if (!isString(regPackage)) return { err: '注册包必须是字符串' }
  // 若注册包为“忽略”，则直接通过
  if (regPackage === ignore) {
    return {
      id: ignore,
      secret: ignore
    }
  }
  const length = regPackage.length
  if (length < 5) return { err: '注册包长至少5个字符' }
  if (!(regPackage.charAt(0) === '{' && regPackage.charAt(length - 1) === '}')) return { err: '注册包必须以"{"开头以"}"结尾' }
  const content = regPackage.substring(1, length - 1)
  const decoded = Base64.decode(content)
  const dataArray = decoded.split('@')
  if (dataArray.length !== 2) return { err: '内容格式错误：数量' }
  const id = parseInt(dataArray[1])
  if (!isNumber(id)) return { err: '内容格式错误：类型' }
  return {
    id,
    secret: dataArray[0]
  }
}
