import Vd from './Vd'
import net from 'net'
import { event } from '../event'

const ClientVd = class extends Vd {
  constructor (config) {
    super()

    this.intervalTimer = null

    this.client = new net.Socket()

    this.client.on('connect', () => {
      event(config.id, '已连接服务器', `${this.client.localAddress} : ${this.client.localPort}`)
      // 向服务器注册
      this.client.write(config.regPackage, () => {
        event(config.id, '向服务器注册', config.regPackage)
      })
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer)
        this.intervalTimer = null
      }
      this.intervalTimer = setInterval(() => {
        if (this.client.writable) {
          this.client.write(config.hbPackage, () => {
            event(config.id, '心跳', config.hbPackage)
          })
        }
      }, 1000 * 60 * config.hbMinutes)
    })

    this.client.on('data', (data) => {
      event(config.id, '收到服务器数据', data.toString())
      this.emit('data', data)
    })

    this.client.on('error', (err) => {
      event(config.id, '服务器连接错误', err.message)
    })

    this.client.on('end', () => {
      event(config.id, '服务器半关连接', '服务器已经半关连接 : 客户端现在请求关闭另一半，以结束连接')
      // 客户端关闭另一半
      this.client.end()
    })

    this.client.on('close', (hadError) => {
      event(config.id, '与服务器连接断开', hadError ? '因为发生错误' : '主动')
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer)
        this.intervalTimer = null
      }
    })

    // 响应父类的事件

    this.on('doStart', () => {
      if (!this.client.connecting && !this.client.readable) {
        this.client.connect(config.port, config.host)
      }
    })

    this.on('doWrite', (data) => {
      if (this.client.writable) {
        this.client.write(data, () => {
          event(config.id, '向服务器发送数据', data.toString())
        })
      }
    })

    this.on('doStop', () => {
      this.client.destroy()
    })

    this.on('doDestroy', () => {
      this.setAutoRestart(false)
      this.client.destroy()
    })
  }
}

export default ClientVd
