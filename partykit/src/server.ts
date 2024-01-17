import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {
    this.rooms = {}
  }

  emitEvent(name: String, message: Object) {
    this.room.broadcast(JSON.stringify({
      event: name,
      data: message
    }))
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Connected to ${this.room.id}`)
    console.log(this.rooms)

    let room = this.rooms[this.room.id]

    if (!room) {
      room = []
      this.rooms[this.room.id] = room
    }

    room.push(conn.id)

    this.emitEvent('COUNT', {
      connections: room.length,
      partyers: room,
    })
  }

  onClose(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Disconnected to ${this.room.id}`)
    const room = this.rooms[this.room.id]

    const index = room.indexOf(conn.id);
    if (index !== -1)
      room.splice(index, 1)
    
    this.emitEvent('COUNT', {
      connections: room.length,
      partyers: room,
    })
  }

  onMessage(message: string, sender: Party.Connection) {
    const payload = JSON.parse(message)

    this.emitEvent(payload.event, {
      senderID: sender.id,
      ...payload.data,
    })
  }
}

Server satisfies Party.Worker;
