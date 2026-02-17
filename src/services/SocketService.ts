import Pop from '../utils/Pop.ts'
import { SocketHandler } from '../utils/SocketHandler.ts'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
  }

  onError(e: Error) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()