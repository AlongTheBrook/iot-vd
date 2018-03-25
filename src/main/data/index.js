import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import log from '../log'

const logger = log.getLogger()
const dataPath = path.join(app.getPath('userData'), 'data')
const deviceListFile = path.join(dataPath, 'device-list.json')

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

const start = async function (getRenderer) {
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
  // 启动周期保存,1分钟检查一次
  const checkPeriodOfMinutes = 1
  logger.info(`Start data update checking job: every ${checkPeriodOfMinutes} minutes`)
  setInterval(() => {
    getRenderer().send('@device.list.check')
  }, 1000 * 60 * checkPeriodOfMinutes)
  logger.info('Data module started')
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
  const deviceList = []
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
  return deviceList
}

const stringifyDeviceList = function (deviceList) {
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
  return JSON.stringify(deviceListSave)
}

const save = async function (deviceListJSON) {
  const deviceListSaveStr = stringifyDeviceList(deviceListJSON)
  await writeFile(deviceListFile, deviceListSaveStr).catch((err) => {
    err.msg = 'Save device list file error'
    logger.fatal(err)
    throw err
  })
  logger.info('Save device list file success')
}

const saveSync = function (deviceListJSON) {
  const deviceListSaveStr = stringifyDeviceList(deviceListJSON)
  try {
    fs.writeFileSync(deviceListFile, deviceListSaveStr)
  } catch (err) {
    err.msg = 'Save device list file error'
    logger.fatal(err)
    throw err
  }
  logger.info('Save device list file success')
}

export default {
  start,
  load,
  save,
  saveSync
}
