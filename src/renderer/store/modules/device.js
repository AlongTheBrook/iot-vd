import { vdType, vdState } from '../../../common/symbol'
import deviceDataModel from '../../../common/device-data-model'

const state = {
  type: vdType,
  state: vdState,
  listUpdateCount: 0,
  list: []
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
  },
  nextId: (state) => {
    const maxId = state.list.reduce((larger, { id }) => {
      return id > larger ? id : larger
    }, 0)
    return maxId + 1
  }
}

const mutations = {
  replace (state, newList) {
    state.list = newList
    state.listUpdateCount += 1
  },
  unshiftDevice (state, device) {
    state.list.unshift(device)
    state.listUpdateCount += 1
  },
  updateDeviceProp (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      device[payload.key] = payload.value
      if (payload.key === 'regPackage') {
        // TODO
        // device['deviceId'] =
      }
      if (deviceDataModel.baseKeySet.has(payload.key)) {
        state.listUpdateCount += 1
      }
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
      state.listUpdateCount += 1
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
      device.currMsgUptime = payload.event.time
      device.currMsg = payload.event.title
    }
  },
  emptyEventList (state, id) {
    let device = state.list.find(device => device.id === id)
    device.eventList = []
  },
  resetListUpdateCount (state) {
    state.listUpdateCount = 0
  },
  reduceListUpdateCount (state, count) {
    if (count < 0) {
      return
    }
    if (count > state.listUpdateCount) {
      state.listUpdateCount = 0
      return
    }
    state.listUpdateCount -= count
  },
  updateState (state, payload) {
    let device = state.list.find(device => device.id === payload.id)
    if (device) {
      device.state = payload.state
    }
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
