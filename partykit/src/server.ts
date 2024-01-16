import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {
    this.connections = {}
  }

  emitEvent(name: String, message: Object) {
    this.room.broadcast(JSON.stringify({
      event: name,
      data: message
    }))
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected:
        id: ${conn.id}
        room: ${this.room.id}
        url: ${new URL(ctx.request.url).pathname}`
    );

    if (!this.connections[this.room.id])
      this.connections[this.room.id] = 0

    this.connections[this.room.id]++

    this.emitEvent('COUNT', {
      connections: this.connections[this.room.id]
    })
  }

  onClose(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Disconnected:
        id: ${conn.id}
        room: ${this.room.id}`
    );

    this.connections[this.room.id]--
    
    this.emitEvent('COUNT', {
      connections: this.connections[this.room.id]
    })
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);

    this.emitEvent('AUDIO', {
      senderID: sender.id,
      frequency: message,
    })
  }
}

Server satisfies Party.Worker;
