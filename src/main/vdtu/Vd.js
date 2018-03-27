import EventEmitter from 'events'

/**
 * 子类需要响应的事件：
 * doStart
 * doWrite
 * doStop
 * doDestroy
 * 子类需要发出的事件：
 * start
 * stop
 * data
 * @type {Vd}
 */
const Vd = class extends EventEmitter {
  constructor () {
    super()

    this.autoRestart = true
    this.timeout = null

    this.on('stop', () => {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      if (this.autoRestart) {
        this.timeout = setTimeout(() => {
          this.timeout = null
          this.start()
        }, 1000 * 60)
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
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    }
  }
}

export default Vd
