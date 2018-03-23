import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import log from '../log'

const logger = log.getLogger()
const dataPath = path.join(app.getPath('userData'), 'data')
const deviceListFile = path.join(dataPath, 'device-list.json')
const deviceList = [
  {
    id: 101,
    name: '设备101',
    deviceId: 43,
    type: 'SERIAL_PORT',
    serialPortName: 'COM2',
    baudRate: 9600,
    databits: 8,
    parity: 'NONE',
    stopbits: 1,
    host: '127.0.0.1',
    port: 50021,
    regPackage: '{NDMyMTBAOTg3NjU=}',
    hbPackage: 'H',
    hbMinutes: 5,
    selected: false,
    state: 'STOPPING',
    hbCountdownSeconds: 56,
    msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
    isEventExpand: false,
    eventList: [
      {
        title: '2018-3-2 17:49:30.1 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      }
    ]
  },
  {
    id: 102,
    name: '设备102',
    deviceId: 13,
    type: 'SERIAL_PORT',
    host: '127.0.0.1',
    port: 50021,
    regPackage: '{NDMyMTBAOTg3NjU=}',
    hbPackage: 'H',
    hbMinutes: 5,
    serialPortName: 'COM2',
    baudRate: 9600,
    databits: 8,
    parity: 'NONE',
    stopbits: 1,
    selected: false,
    state: 'RUNNING',
    hbCountdownSeconds: 12,
    msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
    isEventExpand: false,
    eventList: [
      {
        title: '2018-3-2 17:49:30.1 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.1 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      }
    ]
  },
  {
    id: 103,
    name: '设备103',
    deviceId: 45,
    type: 'TCP',
    host: '127.0.0.1',
    port: 50021,
    regPackage: '{NDMyMTBAOTg3NjU=}',
    hbPackage: 'H',
    hbMinutes: 5,
    serialPortName: 'COM2',
    baudRate: 9600,
    databits: 8,
    parity: 'NONE',
    stopbits: 1,
    selected: false,
    state: 'STOPED',
    hbCountdownSeconds: 34,
    msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
    isEventExpand: false,
    eventList: [
      {
        title: '2018-3-2 17:49:30.1 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      }
    ]
  },
  {
    id: 104,
    name: '设备104',
    deviceId: 40,
    type: 'TCP',
    host: '127.0.0.1',
    port: 50021,
    regPackage: '{NDMyMTBAOTg3NjU=}',
    hbPackage: 'H',
    hbMinutes: 5,
    serialPortName: 'COM2',
    baudRate: 9600,
    databits: 8,
    parity: 'NONE',
    stopbits: 1,
    selected: false,
    state: 'STARTING',
    hbCountdownSeconds: 34,
    msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
    isEventExpand: false,
    eventList: [
      {
        title: '2018-3-2 17:49:30.1 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      },
      {
        title: '2018-3-2 17:49:30.2 服务器 -> 设备',
        content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
        isExpand: false
      }
    ]
  }
]
let deviceListUpdateCount = 6 // 表示设备列表中待保存到文件的主数据的更新次数

const readFile = async function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

const writeFile = async function (filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

const start = async function () {
  // 检查数据目录
  try {
    fs.readdirSync(dataPath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(dataPath)
    } else {
      err.msg = 'Open data dir error'
      logger.fatal(err)
      throw err
    }
  }
  // 加载数据
  await load()
  // 启动周期保存,1分钟检查一次
  const checkPeriodOfMinutes = 1
  logger.info(`Start data update checking job: every ${checkPeriodOfMinutes} minutes`)
  setInterval(() => {
    checkAndSave()
  }, 1000 * 60 * checkPeriodOfMinutes)
}

const load = async function () {
  logger.info(`Loading device list file`)
  // 读取文件
  const data = await readFile(deviceListFile).catch((err) => {
    if (err.code === 'ENOENT') {
      return Promise.resolve('[]')
    }
    err.desc = 'Load device list file error'
    logger.fatal(err)
    throw err
  })
  // 解析数据
  try {
    const deviceListLoad = JSON.parse(data.toString())
    for (let device of deviceListLoad) {
      deviceList.push(Object.assign({}, device, {
        selected: false,
        state: 'STOPED',
        hbCountdownSeconds: 0,
        msg: '',
        isEventExpand: false,
        eventList: []
      }))
    }
  } catch (err) {
    err.desc = 'Parse device list file error'
    logger.fatal(err)
    throw err
  }
  logger.info(`Device list file loaded`)
}

const save = async function () {
  const deviceListSave = []
  for (let device of deviceList) {
    deviceListSave.push(Object.assign({}, device, {
      selected: undefined,
      state: undefined,
      hbCountdownSeconds: undefined,
      msg: undefined,
      isEventExpand: undefined,
      eventList: undefined
    }))
  }
  const deviceListSaveStr = JSON.stringify(deviceListSave)
  await writeFile(deviceListFile, deviceListSaveStr).catch((err) => {
    err.msg = 'Save device list file error'
    logger.fatal(err)
    throw err
  })
}

const checkAndSave = async function () {
  if (deviceListUpdateCount <= 0) return
  logger.info('Checked out that the device list data require to be save, execute saving...')
  await save()
  deviceListUpdateCount = 0
  logger.info('Save device list file success')
}

const shutdownSync = function () {
  if (deviceListUpdateCount <= 0) return
  logger.info('Checked out that the device list data require to be save, execute saving...')
  const deviceListSave = []
  for (let device of deviceList) {
    deviceListSave.push(Object.assign({}, device, {
      selected: undefined,
      state: undefined,
      hbCountdownSeconds: undefined,
      msg: undefined,
      isEventExpand: undefined,
      eventList: undefined
    }))
  }
  let deviceListSaveStr
  try {
    deviceListSaveStr = JSON.stringify(deviceListSave)
    fs.writeFileSync(deviceListFile, deviceListSaveStr)
  } catch (err) {
    err.msg = 'Device list JSON stringify err'
    logger.info(err)
    throw err
  }
  deviceListUpdateCount = 0
  logger.info('Save device list file success')
}

export default {
  start,
  shutdownSync
}
