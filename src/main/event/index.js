let sender

export const initSender = function (getRenderer) {
  sender = getRenderer
}

export const event = function (id, title, content) {
  sender().send('@device.addEvent', {
    id,
    event: {
      time: Date.now(),
      title,
      content
    }
  })
}
