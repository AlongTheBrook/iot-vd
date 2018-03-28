import Vd from './Vd'
import SerialPort from 'serialport'
import {event, state} from '../ipc'
import { vdState } from '../../common/symbol'

const SerialPortVd = class extends Vd {
  constructor (config) {
    super(true)

    this.serialPort = new SerialPort(config.serialPortName, {
      baudRate: config.baudRate,
      dataBits: config.databits,
      parity: config.parity,
      stopBits: config.stopbits,
      autoOpen: false
    })

    this.serialPort.on('open', () => {
      event(config.id, '串口打开', this.serialPort.path)
      this.emit('start')
    })

    this.serialPort.on('data', (data) => {
      event(config.id, '收到串口数据', data.toString())
      this.emit('data', data)
    })

    this.serialPort.on('error', (err) => {
      event(config.id, '串口发生错误', err.message)
      if (this.serialPort.isOpen) {
        this.serialPort.close()
      }
    })

    this.serialPort.on('close', () => {
      this.emit('stop')
      event(config.id, '串口关闭', this.serialPort.path)
    })

    this.serialPort.on('stop', () => {
      if (this.autoRestart) {
        event(config.id, '准备重连串口', `${this.autoRestartSeconds}秒后重连串口`)
        state(config.id, vdState.DEVICE_RECONNECTING)
      }
    })

    // 响应父类的事件

    this.on('doStart', () => {
      if (!this.serialPort.isOpen) {
        this.serialPort.open()
      }
    })

    this.on('doWrite', (data) => {
      if (this.serialPort.isOpen) {
        this.serialPort.write(data, () => {
          event(config.id, '向串口发送数据', data.toString())
        })
      }
    })

    this.on('doStop', () => {
      if (this.serialPort.isOpen) {
        this.serialPort.close()
      }
    })

    this.on('doDestroy', () => {
      this.setAutoRestart(false)
      if (this.serialPort.isOpen) {
        this.serialPort.close(() => {
          this.emit('destroy')
        })
      } else {
        this.emit('destroy')
      }
    })
  }
}

export default SerialPortVd
