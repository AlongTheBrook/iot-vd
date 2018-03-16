const state = {
  type: {
    SERIAL_PORT: 'SERIAL_PORT',
    TCP: 'TCP'
  },
  state: {
    STOPED: 'STOPED',
    STARTING: 'STARTING',
    DEVICE_CONNECTING: 'DEVICE_CONNECTING',
    DEVICE_RECONNECTING: 'DEVICE_RECONNECTING',
    SERVER_CONNECTING: 'SERVER_CONNECTING',
    SERVER_RECONNECTING: 'SERVER_RECONNECTING',
    RUNNING: 'RUNNING',
    HEARTBEAT: 'HEARTBEAT',
    STOPPING: 'STOPPING'
  },
  list: [
    {
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
      state: 'STOPPING',
      hbCountdownSeconds: 56,
      msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
      isEventExpand: false,
      eventList: [
        {
          title: '2018-3-2 17:49:30.1 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        }
      ]
    },
    {
      id: 102,
      name: '设备102',
      deviceId: 13,
      type: 'SERIAL_PORT',
      host: '127.0.0.1',
      port: 50021,
      regPackage: '{NDMyMTBAOTg3NjU=}',
      hbPackage: 'H',
      hbMinutes: 5,
      serialPortName: 'COM2',
      baudRate: 9600,
      databits: 8,
      parity: 'NONE',
      stopbits: 1,
      selected: false,
      state: 'RUNNING',
      hbCountdownSeconds: 12,
      msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
      isEventExpand: false,
      eventList: [
        {
          title: '2018-3-2 17:49:30.1 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.1 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        }
      ]
    },
    {
      id: 103,
      name: '设备103',
      deviceId: 45,
      type: 'TCP',
      host: '127.0.0.1',
      port: 50021,
      regPackage: '{NDMyMTBAOTg3NjU=}',
      hbPackage: 'H',
      hbMinutes: 5,
      serialPortName: 'COM2',
      baudRate: 9600,
      databits: 8,
      parity: 'NONE',
      stopbits: 1,
      selected: false,
      state: 'STOPED',
      hbCountdownSeconds: 34,
      msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
      isEventExpand: false,
      eventList: [
        {
          title: '2018-3-2 17:49:30.1 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        }
      ]
    },
    {
      id: 104,
      name: '设备104',
      deviceId: 40,
      type: 'TCP',
      host: '127.0.0.1',
      port: 50021,
      regPackage: '{NDMyMTBAOTg3NjU=}',
      hbPackage: 'H',
      hbMinutes: 5,
      serialPortName: 'COM2',
      baudRate: 9600,
      databits: 8,
      parity: 'NONE',
      stopbits: 1,
      selected: false,
      state: 'STARTING',
      hbCountdownSeconds: 34,
      msg: '2018-3-2 17:49:30.2 服务器 -> 设备',
      isEventExpand: false,
      eventList: [
        {
          title: '2018-3-2 17:49:30.1 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        },
        {
          title: '2018-3-2 17:49:30.2 服务器 -> 设备',
          content: '[f89q23u5a09udfioh3q290iur09uedc9yq329048u9fj93]',
          isExpand: false
        }
      ]
    }
  ]
}

const getters = {
  selected: state => state.list.find(device => device.selected),
  getById: (state) => (id) => {
    return state.list.find(device => device.id === id)
  },
  type: state => state.type,
  state: state => state.state,
  iconHref: (state) => (type) => {
    switch (type) {
      case state.type.SERIAL_PORT:
        return '#icon-serial-port'
      case state.type.TCP:
        return '#icon-ethernet-port'
      default:
        return ''
    }
  },
  iconBgColor: (state) => (stateValue) => {
    switch (stateValue) {
      case state.state.RUNNING:
        return 'hsl(141, 71%, 48%)'
      case state.state.DEVICE_RECONNECTING:
      case state.state.SERVER_RECONNECTING:
        return 'hsl(348, 100%, 61%)'
      default:
        return 'hsl(0, 0%, 57.5%)'
    }
  }
}

const mutations = {
  replace (state, newList) {
    state.list = newList
  },
  unshiftDevice (state, device) {
    state.list.unshift(device)
  },
  updateDeviceProp (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      device[payload.key] = payload.value
    }
  },
  setSelected (state, id) {
    for (let device of state.list) {
      if (device.id === id) {
        device.selected = true
      } else {
        device.selected = false
      }
    }
  },
  delete (state, id) {
    let index = state.list.findIndex(device => device.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  setEventExpand (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      device.isEventExpand = payload.isEventExpand
      for (let event of device.eventList) {
        event.isExpand = payload.isEventExpand
      }
    }
  },
  setSingleEventExpand (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      device.eventList[payload.index].isExpand = !device.eventList[payload.index].isExpand
    }
  },
  addEvent (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      if (device.eventList.length >= 128) {
        device.eventList.shift()
      }
      device.eventList.push(Object.assign({}, payload.event, {isExpand: device.isEventExpand}))
      device.msg = payload.event.title
    }
  },
  clearEventList (state, id) {
    let device = state.list.find(device => device.id === id)
    device.eventList = []
  }
}

const actions = {
  createDevice ({ commit }, device) {
    commit('unshiftDevice', device)
    commit('setSelected', device.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
