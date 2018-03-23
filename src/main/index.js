'use strict'
import log from './log'
import data from './data'
import { app, BrowserWindow, Menu, Tray } from 'electron'

import serialportTest from './serialport.test' // debug

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
          mainWindow.webContents.send('@quit')
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
    // 数据模块启动
    data.start().then(() => {
      logger.info('Data module stated')
    })
    // debug
    serialportTest.run(mainWindow)
    try {
      // console.log('home: ', app.getPath('home'))
      // console.log('appData: ', app.getPath('appData'))
      // console.log('userData: ', app.getPath('userData'))
      // console.log('temp: ', app.getPath('temp'))
      // console.log('desktop: ', app.getPath('desktop'))
      // console.log('exe: ', app.getPath('exe'))
      // console.log('logs: ', app.getPath('logs'))
      logger.info(`home: ${app.getPath('home')}`)
      logger.info(`appData: ${app.getPath('appData')}`)
      logger.info(`userData: ${app.getPath('userData')}`)
      logger.debug(`temp: ${app.getPath('temp')}`)
      logger.debug(`desktop: ${app.getPath('desktop')}`)
      logger.debug(`logs: ${app.getPath('logs')}`)
      logger.debug(`exe: ${app.getPath('exe')}`)
      mainWindow.webContents.send('@device', `home: ${app.getPath('home')}`)
      mainWindow.webContents.send('@device', `appData: ${app.getPath('appData')}`)
      mainWindow.webContents.send('@device', `userData: ${app.getPath('userData')}`)
      mainWindow.webContents.send('@device', `temp: ${app.getPath('temp')}`)
      mainWindow.webContents.send('@device', `desktop: ${app.getPath('desktop')}`)
      mainWindow.webContents.send('@device', `logs: ${app.getPath('logs')}`)
      mainWindow.webContents.send('@device', `exe: ${app.getPath('exe')}`)
    } catch (err) {
      console.log(err)
    }
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

app.on('ready', createWindow)

app.on('before-quit', () => {
  logger.info('App is going to quit, and now executing some jobs before quit')
  data.shutdownSync()
  logger.info('Data module was shut down safely')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  logger.info('App was quited')
  log.shutdown(() => {
    // 在日志模块关闭的回调函数中，日志功能已经不能使用，故只得只用控制台输出
    console.log('Log module was shut down safely (You can see me only in deployment mode)')
  })
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
