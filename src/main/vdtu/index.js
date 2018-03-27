import Vdtu from './Vdtu'
import { event } from '../event'

const map = new Map()

const check = function (config) {
  if (!(config instanceof Object)) {
    event(config.id, '参数错误', '参数必须是对象')
    return false
  }
  if (typeof config.id !== 'number') {
    event(config.id, '参数错误', 'ID必须是数字')
    return false
  }
  if (map.has(config.id)) {
    event(config.id, '启动实例已存在', '启动实例已存在')
  }
  return true
}

const create = async function (config) {
  if (!check(config)) {
    throw new Error()
  }
  const vdtu = new Vdtu(config)
  map.set(config.id, vdtu)
  vdtu.start()
}

const destroy = async function (id) {
  if (!map.has(id)) {
    event(id, '启动实例已存在', '启动实例已存在')
    return false
  }
  const vdtu = map.get(id)
  map.delete(id)
  vdtu.destroy()
}

export default {
  create,
  destroy
}
