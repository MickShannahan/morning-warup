import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.js'
import { streakService } from './services/StreakService.js'
import { logger } from './utils/Logger.js'
import { AppState } from './AppState.js'

export function App() {

  streakService.loadStreakData()
  const continueStreak = streakService.checkForStreakContinue()
  logger.log('🔥', continueStreak, AppState.currentStreak)
  if (!continueStreak) {
    logger.warn("Streak failed")
    streakService.clearStreak()
  } else {
    logger.log("Streak continued")
  }

  return (
    <div className="App" id="app">
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>


    </div>
  )
}
