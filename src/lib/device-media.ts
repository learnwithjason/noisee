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