import EventEmitter from 'events'

/**
 * 构造参数
 * autoRestart: 是否自动重启，选填，默认为true
 * 子类需要响应的事件：
 * doStart
 * doWrite
 * doStop
 * doDestroy
 * 子类需要发出的事件：
 * start
 * data
 * stop
 * destroy
 * @type {Vd}
 */
const Vd = class extends EventEmitter {
  constructor (autoRestart, autoRestartSeconds) {
    super()

    this.autoRestart = (typeof autoRestart === 'boolean' || autoRestart instanceof Boolean) ? autoRestart : true
    this.autoRestartSeconds = (typeof autoRestartSeconds === 'number' || autoRestart instanceof Number) ? (autoRestart < 0 ? 60 : autoRestart) : 60
    this.autoRestartTimer = null

    this.on('stop', () => {
      if (this.autoRestartTimer) {
        clearTimeout(this.autoRestartTimer)
        this.autoRestartTimer = null
      }
      if (this.autoRestart) {
        this.autoRestartTimer = setTimeout(() => {
          this.autoRestartTimer = null
          this.start()
        }, 1000 * this.autoRestartSeconds)
      }
    })
  }

  start () {
    this.emit('doStart')
  }

  write (data) {
    this.emit('doWrite', data)
  }

  stop () {
    this.emit('doStop')
  }

  destroy () {
    this.emit('doDestroy')
  }

  setAutoRestart (autoRestart) {
    this.autoRestart = autoRestart
    if (!this.autoRestart) {
      if (this.autoRestartTimer) {
        clearTimeout(this.autoRestartTimer)
        this.autoRestartTimer = null
      }
    }
  }
}

export default Vd
