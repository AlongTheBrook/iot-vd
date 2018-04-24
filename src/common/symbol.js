/**
 * 为了解决反序列化的问题，各种符号并不使用“Symbol”类型
 */

export const vdType = {
  SERIAL_PORT: 'SERIAL_PORT',
  TCP: 'TCP'
}

export const vdState = {
  STOPED: 'STOPED',
  STARTING: 'STARTING',
  DEVICE_CONNECTING: 'DEVICE_CONNECTING',
  DEVICE_RECONNECTING: 'DEVICE_RECONNECTING',
  SERVER_CONNECTING: 'SERVER_CONNECTING',
  SERVER_RECONNECTING: 'SERVER_RECONNECTING',
  RUNNING: 'RUNNING',
  HEARTBEAT: 'HEARTBEAT',
  STOPPING: 'STOPPING'
}

const buildSerialPortList = function (count) {
  const list = []
  for (let i = 0; i < count; i++) {
    list.push('COM' + (i + 1))
  }
  return list
}

export const serialPortOptions = {
  portList: buildSerialPortList(256),
  baudRate: [110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200],
  dataBits: [8, 7, 6, 5],
  parity: ['none', 'even', 'mark', 'odd', 'space'],
  stopBits: [1, 2]
}

export const ignore = '<ignore>'
