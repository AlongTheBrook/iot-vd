import Vdtu from './Vdtu'
import { receive, event, state } from '../ipc'
import log from '../log'
import { vdState, vdType, serialPortOptions } from '../../common/symbol'

const logger = log.getLogger()

const map = new Map()

const start = async function () {
  await init()
  logger.info('Vdtu module started')
}

const init = async function () {
  receive('@device.start', (e, config) => {
    create(config)
  })
  receive('@device.startBatch', (e, configArray) => {
    createBatch(configArray)
  })
  receive('@device.stop', (e, id) => {
    destroy(id)
  })
  receive('@device.stopBatch', (e, idArray) => {
    destroyBatch(idArray)
  })
}

const isNumber = function (value) {
  return typeof value === 'number' || value instanceof Number
}

const isString = function (value) {
  return typeof value === 'string' || value instanceof String
}

const check = function (config) {
  if (!(config instanceof Object)) {
    event(config.id, '参数错误', '参数必须是对象')
    return false
  }
  if (!isNumber(config.id)) {
    event(config.id, '参数错误', 'ID必须是数字')
    return false
  }
  if (map.has(config.id)) {
    event(config.id, '启动实例已存在', '启动实例已存在')
    return false
  }
  if (!vdType.hasOwnProperty(config.type)) {
    event(config.id, '不支持的设备类型', config.type)
    return false
  }
  switch (config.type) {
    case vdType.SERIAL_PORT:
      if (serialPortOptions.portList.indexOf(config.serialPortName) === -1) {
        event(config.id, '串口配置错误', `名称配置错误：${config.serialPortName}`)
        return false
      }
      if (serialPortOptions.baudRate.indexOf(config.baudRate) === -1) {
        event(config.id, '串口配置错误', `波特率配置错误：${config.baudRate}`)
        return false
      }
      if (serialPortOptions.dataBits.indexOf(config.databits) === -1) {
        event(config.id, '串口配置错误', `数据位配置错误：${config.databits}`)
        return false
      }
      if (serialPortOptions.parity.indexOf(config.parity) === -1) {
        event(config.id, '串口配置错误', `奇偶校验配置错误：${config.parity}`)
        return false
      }
      if (serialPortOptions.stopBits.indexOf(config.stopbits) === -1) {
        event(config.id, '串口配置错误', `停止位配置错误：${config.stopbits}`)
        return false
      }
      break
    case vdType.TCP:
      event(config.id, '尚未支持的设备类型', config.type)
      return false
    default:
      event(config.id, '不支持的设备类型', config.type)
      return false
  }
  if (!(isString(config.host) && config.host.length !== 0)) {
    event(config.id, '服务器配置错误', `服务器名配置错误：${config.host}`)
    return false
  }
  if (!(isNumber(config.port) && config.port >= 0 && config.port <= 65535)) {
    event(config.id, '服务器配置错误', `端口配置错误：${config.port} （整数，范围：0 - 65535）`)
    return false
  }
  if (!(isString(config.regPackage) && config.regPackage.length !== 0)) {
    event(config.id, '服务器配置错误', `注册包配置错误：${config.regPackage}`)
    return false
  }
  if (!(isString(config.hbPackage) && config.hbPackage.length !== 0)) {
    event(config.id, '服务器配置错误', `心跳包配置错误：${config.hbPackage}`)
    return false
  }
  if (!(isNumber(config.hbMinutes) && config.hbMinutes >= 1)) {
    event(config.id, '服务器配置错误', `心跳周期配置错误：${config.hbMinutes} （数值，不能小于1分钟）`)
    return false
  }
  if (!isNumber(config.deviceId)) {
    event(config.id, '远程设备ID错误', '远程设备ID错误，可能是因为注册包错误导致')
    return false
  }
  return true
}

const create = function (config) {
  state(config.id, vdState.STARTING)
  if (!check(config)) {
    state(config.id, vdState.STOPED)
    return
  }
  const vdtu = new Vdtu(config)
  map.set(config.id, vdtu)
  vdtu.start()
}

const createBatch = function (configArray) {
  if (!(configArray instanceof Array)) {
    return
  }
  for (const config of configArray) {
    create(config)
  }
}

const destroy = function (id) {
  state(id, vdState.STOPPING)
  if (!map.has(id)) {
    event(id, '实例不存在', '实例不存在')
    state(id, vdState.STOPED)
    return
  }
  const vdtu = map.get(id)
  map.delete(id)
  vdtu.once('destroy', () => {
    state(id, vdState.STOPED)
  })
  vdtu.destroy()
}

const destroyBatch = function (idArray) {
  if (!(idArray instanceof Array)) {
    return
  }
  for (const id of idArray) {
    destroy(id)
  }
}

export default {
  start,
  create,
  createBatch,
  destroy,
  destroyBatch
}
