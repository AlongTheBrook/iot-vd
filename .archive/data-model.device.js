const device = {
  id: 101,
  name: '设备101',
  deviceId: 43,
  type: 'SERIAL_PORT',
  serialPortName: 'COM2',
  baudRate: 9600,
  databits: 8,
  parity: 'NONE',
  stopbits: 1,
  host: '127.0.0.1',
  port: 50021,
  regPackage: '{NDMyMTBAOTg3NjU=}',
  hbPackage: 'H',
  hbMinutes: 5,
  selected: false,
  state: 'STOPED',
  hbCountdownSeconds: 0,
  currMsgUptime: Date.now(),
  currMsg: '已加载',
  isEventExpand: false,
  eventList: [{
    time: Date.now(),
    title: '已加载',
    content: '设备配置参数已加载',
    isExpand: false
  }]
}

export default device
