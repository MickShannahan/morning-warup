import { dev } from '../env.js'

function log(type: string, content: any) {
  if (dev) {
    //@ts-ignore
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  } else {
    switch (type) {
      case 'log':
      case 'assert':
        return
    }
    // TODO SEND LOGS TO EXTERNAL SERVICE
    //@ts-ignore
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  }
}

export const logger = {
  log(...args: any[]) {
    log('log', args)
  },
  error(...args: any[]) {
    log('error', args)
  },
  warn(...args: any[]) {
    log('warn', args)
  },
  assert(...args: any[]) {
    log('assert', args)
  },
  trace(...args: any[]) {
    log('trace', args)
  },
  groupCollapsed(...args: any[]) {
    log('groupCollapsed', args)
  },
  groupEnd(...args: any[]) {
    log('groupEnd', args)
  },
}