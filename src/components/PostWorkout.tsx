import { useEffect } from "react";
import { Workout } from "../models/Workout";
import { streakService } from "../services/StreakService";
import { playSoundEffect } from "../utils/AudioPlayer";
import StreakWeek from "./StreakWeek";
import { Link } from "react-router-dom";
import confetti from "@hiseb/confetti";

export default function PostWorkout({ workoutsCompleted }: { workoutsCompleted: Workout[] }) {

  useEffect(() => {
    streakService.addTodayToStreak()
    confetti()
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