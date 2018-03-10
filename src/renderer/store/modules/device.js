const state = {
  list: [
    {
      id: 101,
      name: '设备101',
      deviceId: 10001,
      type: 1,
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
      state: 2,
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
      deviceId: 10002,
      type: 2,
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
      state: 3,
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
      deviceId: 10003,
      type: 3,
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
      state: 1,
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
  selected: (state) => {
    return state.list.find(device => device.selected)
  },
  getById: (state) => (id) => {
    return state.list.find(device => device.id === id)
  }
}

const mutations = {
  replace (state, newList) {
    state.list = newList
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
