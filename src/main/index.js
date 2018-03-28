'use strict'
import log from './log'
import data from './data'
import { init, send } from './ipc'
import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import vdtu from './vdtu'

const path = require('path')
const logger = log.getLogger()

logger.info('App start')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function getMainWindow () {
  return mainWindow
}

init(getMainWindow)

function activateWindow () {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    }
    mainWindow.focus()
  } else {
    createWindow()
  }
}

function initTray () {
  if (!tray) {
    tray = new Tray(path.join(__static, '/tray.ico'))
    const trayMenu = Menu.buildFromTemplate([
      {
        label: '显示窗口',
        click () {
          activateWindow()
        }
      },
      {
        label: '退出',
        click () {
          send('@readyQuit')
        }
      }
    ])
    tray.setContextMenu(trayMenu)
    tray.on('click', () => {
      activateWindow()
    })
  }
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 960,
    height: 678,
    minWidth: 960,
    minHeight: 678,
    frame: false,
    show: false,
    // thickFrame: false, // 为false时，窗口最小化和恢复的动画消失，窗口阴影消失，最大化和还原被禁用
    backgroundThrottling: false
  })

  mainWindow.loadURL(winURL)

  /* 窗体内容渲染完毕再显示窗口 */
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // 初始化托盘
    initTray()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const isDuplicateInstance = app.makeSingleInstance((args, workingDirectory) => {
  activateWindow()
})

if (isDuplicateInstance) {
  app.quit()
}

app.on('ready', onReady)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  logger.info('App is going to quit, and now executing some jobs before quit')
  // data.shutdownSync()  // TODO
  logger.info('Data module was shut down safely')
})

app.on('will-quit', () => {
  logger.info('App was quited')
  log.shutdown(() => {
    // 在日志模块关闭的回调函数中，日志功能已经不能使用，故只得只用控制台输出
    console.log('Log module was shut down safely (You can see me only in deployment mode)')
  })
})

function onReady () {
  Promise.all([data.start(), vdtu.start()]).then(() => {
    logger.info('App create window')
    createWindow()
  }).catch((err) => {
    err.msg = 'App Starting failed on some job'
    logger.fatal(err)
    logger.fatal('App has to quit')
    app.quit()
  })
}

ipcMain.on('@readyQuitSet', () => {
  // 此处全部采用同步方式完成工作
  // TODO
  send('@quit')
})

ipcMain.on('@device.list.load', (e) => {
  data.load().then(deviceList => send('@device.list', deviceList))
})

ipcMain.on('@device.list.save', (e, deviceList) => {
  data.save(deviceList)
})

ipcMain.on('@device.list.saveSync', (e, deviceList) => {
  data.saveSync(deviceList)
  e.returnValue = true
})

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })
//
// app.on('maximize', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
