import { ipcMain } from 'electron'

let getMainWindow

export const init = function (_getMainWindow) {
  this.getMainWindow = _getMainWindow
}

export const send = function (...args) {
  getMainWindow().webContents.send(...args)
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
