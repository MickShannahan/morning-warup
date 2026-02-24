import { logger } from "./Logger"
import { Pop } from "./Pop"



export function saveState(key: string, data: any) {
  localStorage.setItem('haru_' + key, JSON.stringify(data))
}

export function loadState<T = any>(key: string, deserializer?: (data: any) => T): T | undefined {
  try {
    const data = localStorage.getItem('haru_' + key)
    if (!data) throw new Error(`Could not load ${key} from local`)
    const parsed = JSON.parse(data)
    return deserializer ? deserializer(parsed) : (parsed as T)
  } catch (error) {
    logger.warn(error)
    Pop.error(error)
    return undefined
  }
}