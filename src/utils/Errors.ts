export class RouterError extends Error {
  data: string
  status: number
  statusText: string
  constructor(statusText: string, message: string, status = 404) {
    super(message)
    this.data = message
    this.status = status
    this.statusText = statusText
  }
}