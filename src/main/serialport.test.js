import SerialPort from 'serialport'

export default {
  run (mainWindow) {
    SerialPort.list().then((ports) => {
      console.log('Serial port list:\r\n')
      console.log(ports)
      ports.forEach((port, index) => {
        const serialPort = new SerialPort(port.comName)
          .on('open', () => {
            // console.log(port.comName, ' opened')
            mainWindow.webContents.send('@device', `${port.comName} opened`)
            if (index % 2 === 0) {
              setInterval(() => {
                const data = `I'm ${port.comName}`
                // console.log(port.comName, ' -> ', data)
                mainWindow.webContents.send('@device', `${port.comName} -> ${data}`)
                serialPort.write(data)
              }, Math.random() * 10000)
            }
          })
          .on('data', (data) => {
            // console.log(port.comName, ' <- ', data.toString())
            mainWindow.webContents.send('@device', `${port.comName} <- ${data.toString()}`)
          })
      })
    }).catch((err) => {
      // console.log('Occured error:\r\n', err)
      mainWindow.webContents.send('@device', `Occured error: ${err.toString()}`)
    })
  }
}
