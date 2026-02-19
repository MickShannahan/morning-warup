import { Workout } from "../models/Workout"
import './ActiveWorkout.scss'

export default function ActiveWorkout({ workout, workoutPlayState }: { workout: Workout | null, workoutPlayState: boolean }) {

  if (!workout) return null

  return (
    <section>
      <div className="fs-1 text-center fw-bold">
        {workout.name} {workoutPlayState ? '▶️' : '⏸️'}
      </div>
      <div className={`${workoutPlayState ? 'playing' : 'paused'}`}>
        <div className="text-center">
          <img src={workout.img} alt="animating image of workout" className="img-fluid" />
        </div>
      </div>
    </section>
  )
}