import Vd from './Vd'
import ClientVd from './ClientVd'
import SerialPortVd from './SerialPortVd'
import NetPortTcpVd from './NetPortTcpVd'
import { vdType } from '../../common/symbol'

const Vdtu = class extends Vd {
  constructor (config) {
    super()

    this.config = config

    this.deviceVd = this.newDeviceVd()
    this.clientVd = new ClientVd(config)

    this.deviceVd.on('start', () => {
      this.clientVd.setAutoRestart(true)
      this.clientVd.start()
    })

    this.deviceVd.on('data', (data) => {
      this.clientVd.write(data)
    })

    this.deviceVd.on('stop', () => {
      this.clientVd.setAutoRestart(false)
      this.clientVd.stop()
    })

    this.clientVd.on('data', (data) => {
      this.deviceVd.write(data)
    })

    // 响应父类的事件

    this.on('doStart', () => {
      this.deviceVd.start()
    })

    this.on('doStop', () => {
      this.deviceVd.stop()
    })

    this.on('doDestroy', () => {
      this.clientVd.destroy()
      this.deviceVd.destroy()
    })
  }

  newDeviceVd () {
    switch (this.config.type) {
      case vdType.SERIAL_PORT:
        return new SerialPortVd(this.config)
      case vdType.TCP:
        return new NetPortTcpVd(this.config)
      default:
        throw new Error(`Unsupported vd type: ${this.config.type}`)
    }
  }
}

export default Vdtu
