import { app } from 'electron'
import path from 'path'
import log4js from 'log4js'

const filenameBase = app.getName() + '.log'
const filename = path.join(app.getPath('userData'), 'log', filenameBase)

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout'
    },
    dateFile: {
      type: 'dateFile',
      filename: filename,
      keepFileExt: true,
      compress: true,
      daysToKeep: 365
    }
  },
  categories: {
    default: {
      appenders: [process.env.NODE_ENV === 'development' ? 'stdout' : 'dateFile'],
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    }
  }
})

export default log4js
