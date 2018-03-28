import Vdtu from './Vdtu'
import { receive, event, state } from '../ipc'
import { vdState } from '../../common/symbol'
import log from '../log'

const logger = log.getLogger()

const map = new Map()

const start = async function () {
  await init()
  logger.info('Vdtu module started')
}

const init = async function () {
  receive('@device.start', (config) => {
    create(config)
  })
  receive('@device.startBatch', (configArray) => {
    createBatch(configArray)
  })
  receive('@device.stop', (id) => {
    destroy(id)
  })
  receive('@device.stopBatch', (idArray) => {
    destroyBatch(idArray)
  })
}

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
    return false
  }
  return true
}

const create = function (config) {
  state(config.id, vdState.STARTING)
  if (!check(config)) {
    state(config.id, vdState.STOPED)
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
