import {Socket} from "phoenix"


export class FileSystemChecker {
  private _socket: Socket

  constructor() {
    this._socket = new Socket('/socket')
    this._socket.connect()
    this.createChannel()
  }

  public createChannel = () => {
    const channel = this._socket.channel("example", {})
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.onMessage = (ev, payload) => {
      console.log(ev, payload);
      return payload
    }

  }

}
