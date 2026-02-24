import { AppState } from "../AppState"
import { loadState, saveState } from "../utils/LocalStorage"


class StreakService {

  addTodayToStreak() {
    const currentStreak = AppState.currentStreak
    const today = new Date().toLocaleDateString()
    if (currentStreak.includes(today)) return
    currentStreak.push(today)
    AppState.longestStreak = Math.max(AppState.longestStreak, AppState.currentStreak.length)
    this.saveStreakData()
  }

  loadStreakData() {
    const currentStreak = loadState<string[]>('current_streak') || []
    AppState.currentStreak = currentStreak

    const longestStreak = loadState<number>('longest_streak') || 0
    AppState.longestStreak = longestStreak

    const streakStart = loadState<Date>('streak_start') || new Date()
    AppState.streakStart = streakStart
  }


  saveStreakData() {
    saveState('current_streak', AppState.currentStreak)
    saveState('longest_streak', AppState.longestStreak)
    saveState('streak_start', AppState.streakStart)
  }


}

export const streakService = new StreakService()