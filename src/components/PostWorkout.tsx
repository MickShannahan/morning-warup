import { useEffect } from "react";
import { Workout } from "../models/Workout";
import { streakService } from "../services/StreakService";
import { playSoundEffect } from "../utils/AudioPlayer";
import JSConfetti from "js-confetti";
import { AppState } from "../AppState";

export default function PostWorkout({ workoutsCompleted }: { workoutsCompleted: Workout[] }) {

  useEffect(() => {
    streakService.addTodayToStreak()
    const confetti = new JSConfetti()
    confetti.addConfetti(
      {
        emojis: ['🌸', '🎟️', '🔥', '🟪', '🟦', '🟩', '💗'],
        emojiSize: 25,
        confettiNumber: 10 * AppState.currentStreak.length
      })
    playSoundEffect('ended')
  }, [])



  return (
    <section>
      <div className="d-flex justify-content-center">
        <img src="/morning-warup/Haru_Urara_Umamusume.png" />
      </div>
    </section>
  )
}