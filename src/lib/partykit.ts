import PartySocket from 'partysocket'

import {connections, partyers} from '$lib/store.ts'
import * as effects from '$lib/effects.ts'

let conn

export function emitEvent(name: String, message: Object) {
  conn && conn.send(JSON.stringify({
    event: name,
    data: message,
  }))
}

export async function startParty(roomNumber) {
  conn = new PartySocket({
    // host: 'http://localhost:1999/',
    host: 'https://partykit.argyleink.partykit.dev',
    room: roomNumber,
  })

  conn.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data)

    if (payload.data.senderID === conn.id)
      return

    switch(payload.event) {
      case 'COUNT':
        connections.set(payload.data.connections)
        partyers.set(
          payload.data.partyers
            .map(partyer => {
              return {
                id: partyer,
                gradient: 'radial',
              }
            })
        )
        break
      case 'AUDIO':
        partyers.update(value => {
          value
            .forEach((partyer, i) => {
              if (partyer.id !== payload.data.senderID) return

              partyer.low = payload.data.low
              partyer.high = payload.data.high

              document.firstElementChild.style
                .setProperty(`--partyer-${i}-frequency-low`, payload.data.low +`%`)
              document.firstElementChild.style
                .setProperty(`--partyer-${i}-frequency-high`, payload.data.high +`%`)
            })

          return value
        })
        break
      case 'GRADIENT':
        partyers.update(value => {
          value
            .forEach((partyer, i) => {
              if (partyer.id !== payload.data.senderID) return

              partyer.gradient = payload.data.type

              document.firstElementChild.style
                .setProperty('--partyer-'+i, effects[payload.data.type]('partyer-'+i+'-'))
            })

          return value
        })

        break
    }
  })

  return conn
}
