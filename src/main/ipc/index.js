import { ipcMain } from 'electron'
import log from '../log'

const logger = log.getLogger()

let getMainWindow = function () {}

export const init = function (_getMainWindow) {
  getMainWindow = _getMainWindow
}

export const send = function (...args) {
  const mainWindow = getMainWindow()
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send(...args)
  } else {
    logger.warn(`The Message was not sent because of the main window was not initialized : ${JSON.stringify(args)}`)
  }
}

export const receive = function (...args) {
  ipcMain.on(...args)
}

export const event = function (id, title, content) {
  send('@device.addEvent', {
    id,
    event: {
      time: Date.now(),
      title,
      content
    }
  })
}

export const state = function (id, state) {
  send('@device.state', {id, state})
}
