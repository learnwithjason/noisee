import PartySocket from 'partysocket'

import {connections} from '$lib/store.ts'

// declare const PARTYKIT_HOST: string

let pingInterval: ReturnType<typeof setInterval>

export function startParty(roomNumber) {
  const conn = new PartySocket({
    // host: 'http://localhost:1999/',
    host: 'https://partykit.argyleink.partykit.dev',
    room: roomNumber,
  })

  conn.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data)
    console.info(payload)

    switch(payload.event) {
      case 'COUNT':
        connections.set(payload.data.connections)
        break
      case 'AUDIO':
        // todo
        break
    }
  })

  // conn.addEventListener('connections', (event) => {
  //   console.log(`Connections -> ${event.data}`)
  //   connections.set(event.data)
  // })

  conn.addEventListener('open', () => {
    // console.log('Connected!')
    console.log('Sending a ping every 2 seconds...')

    clearInterval(pingInterval)
    pingInterval = setInterval(() => {
      conn.send('ping')
    }, 1000)
  })

  return conn
}
