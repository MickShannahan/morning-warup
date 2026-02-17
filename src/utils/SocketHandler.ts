import { io, Socket } from 'socket.io-client'
import { baseURL, useSockets } from '../env.js'
import { logger } from './Logger.js'
import { DefaultEventsMap } from '@socket.io/component-emitter'

const SOCKET_EVENTS = {
  connection: 'connection',
  connected: 'connected',
  disconnect: 'disconnect',
  authenticate: 'authenticate',
  authenticated: 'authenticated',
  userConnected: 'userConnected',
  userDisconnected: 'userDisconnected',
  error: 'error'
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null
let authenticated = false
let queue: { handler: string; action: any; payload: any }[] = []

function getSocketConnection(url: string) {
  if (!socket) {
    socket = io(url)
    registerGlobalSocketMessages(socket)
  }
  return socket
}

function registerGlobalSocketMessages(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
  socket.on(SOCKET_EVENTS.error, onSocketError)
  socket.on(SOCKET_EVENTS.authenticated, runPlayback)
}

function runPlayback() {
  logger.groupCollapsed('⚡[SOCKET_AUTHENTICATED]')
  authenticated = true
  if (!queue.length) { return }
  const playback = [...queue]
  queue = []
  playback.forEach(e => {
    logger.log(`📡 ${e.handler}`, e.action, e.payload)
    socket?.emit(e.action, e.payload)
  })
  logger.groupEnd()
}

function onSocketError(error: Error) {
  logger.error('⚡[SOCKET_ERROR]', error)
}

export class SocketHandler {
  socket: any
  requiresAuth!: boolean
  /**
   * @param {boolean} requiresAuth
   * @param {String} url
   */
  constructor(requiresAuth = false, url = '') {
    if (!useSockets) { return }
    getSocketConnection(url || baseURL)
    this.socket = socket
    this.requiresAuth = requiresAuth
  }

  on(event: string, fn: (...args: any[]) => void) {
    const ctx = this
    this.socket?.on(event, (...args: any[]) => {
      try {
        fn.call(ctx, ...args)
      } catch (error) {
        logger.warn('🩻[FATAL EVENT]', event)
        logger.error('💀[FATAL ERROR IN HANDLER METHOD]', error)
      }
    })
    return this
  }

  authenticate(bearerToken: string) {
    this.socket?.emit(SOCKET_EVENTS.authenticate, bearerToken)
  }

  enqueue(action: string, payload: any) {
    const handler = this.constructor.name
    const enqueued = { handler, action, payload }
    logger.log('📼[ENQUEING_ACTION]', enqueued)
    queue.push(enqueued)
  }


  emit(action: string, payload: any = undefined) {
    if (this.requiresAuth && !authenticated) {
      return this.enqueue(action, payload)
    }
    logger.log('📡', action, payload)
    this.socket?.emit(action, payload)
  }
}