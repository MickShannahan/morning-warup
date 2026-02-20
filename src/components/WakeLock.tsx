import { useEffect } from "react"
import { logger } from "../utils/Logger"


export default function WakeLock({ keepAlive }: { keepAlive: boolean }) {

  useEffect(() => {
    if (keepAlive) requestWakeLock()
  }, [keepAlive])


  async function requestWakeLock() {
    try {
      const wakelock = await navigator.wakeLock.request('screen')

      document.addEventListener('visibilitychange', async () => {
        if (document.hidden) wakelock.release()
      })

      return wakelock
    } catch (error) {
      logger.warn('🔒 Error Keeping screen awake')
      logger.error(error)
    }
  }

  return (<div className="d-none">wake lock 🔒</div>)
}