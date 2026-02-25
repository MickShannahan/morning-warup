import { AppState } from "../AppState"
import { Time } from "../utils/easyTimes"
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

  checkForStreakContinue() {
    if (AppState.currentStreak.length <= 0) return true
    const lastDay = new Date(AppState.currentStreak[AppState.currentStreak.length - 1]).getTime()
    const today = new Date().getTime()
    const timeDif = today - lastDay
    if (timeDif > Time.days(2)) return false

    return true
  }

  clearStreak() {
    AppState.currentStreak = []
    this.saveStreakData()
  }

  loadStreakData() {
    const currentStreak = loadState<string[]>('current_streak') || []
    AppState.currentStreak = currentStreak

    const longestStreak = loadState<number>('longest_streak') || 0
    AppState.longestStreak = longestStreak
  }


  saveStreakData() {
    saveState('current_streak', AppState.currentStreak)
    saveState('longest_streak', AppState.longestStreak)
  }


}

export const streakService = new StreakService()