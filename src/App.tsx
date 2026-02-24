import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.js'
import { streakService } from './services/StreakService.js'

export function App() {

  streakService.loadStreakData()

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
