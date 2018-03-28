import { vdType, vdState } from './symbol'

const newBase = function (id) {
  return {
    id: id,
    name: '新建设备-' + id,
    deviceId: null,
    type: vdType.SERIAL_PORT,
    serialPortName: '',
    baudRate: 9600,
    databits: 8,
    parity: 'NONE',
    stopbits: 1,
    host: 'iot.thisyet.com',
    port: 50021,
    regPackage: '',
    hbPackage: 'H',
    hbMinutes: 5
  }
}

const loadRuntime = function () {
  return {
    selected: false,
    state: vdState.STOPED,
    hbCountdownSeconds: 0,
    currMsgUptime: Date.now(),
    currMsg: '已加载',
    isEventExpand: false,
    eventList: [{
      time: Date.now(),
      title: '已加载',
      content: '已加载设备参数',
      isExpand: false
    }]
  }
}

const newRuntime = function () {
  return {
    selected: false,
    state: vdState.STOPED,
    hbCountdownSeconds: 0,
    currMsgUptime: Date.now(),
    currMsg: '创建',
    isEventExpand: false,
    eventList: [{
      time: Date.now(),
      title: '创建',
      content: '创建设备',
      isExpand: false
    }]
  }
}

const undefinedRuntime = function () {
  return {
    selected: undefined,
    state: undefined,
    hbCountdownSeconds: undefined,
    currMsgUptime: undefined,
    currMsg: undefined,
    isEventExpand: undefined,
    eventList: undefined
  }
}

export default {
  newBase,
  loadRuntime,
  newRuntime,
  undefinedRuntime
}
