export async function listAudioDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  
  return devices
    .filter(device => device.kind === 'audioinput')
    .map(device => {
      return {
        id: device.deviceId,
        name: device.label.slice(0, device.label.indexOf(' (')) ,
      }
    })
}

// export async function startMicrophone() {
//   let device = await navigator.mediaDevices
//     .getUserMedia({audio: {
//       autoGainControl: false,
//       latency: 0,
//     }})

//   devices = await listAudioDevices()
// }

// export function stopMicrophone() {
//   state.device.getTracks()
//     .forEach(track => 
//       track.stop())
  
//   state.device = null
//   state.devices = null
//   state.stream = {}
//   state.data = {}
// }