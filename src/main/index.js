'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'

const path = require('path')

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
    height: 640,
    minWidth: 768,
    minHeight: 512,
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

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
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
