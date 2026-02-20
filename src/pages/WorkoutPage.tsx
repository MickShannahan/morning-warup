import { useEffect, useRef, useState } from "react"
import './WorkoutPage.scss'
import { useSearchParams } from "react-router-dom"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { GetRandomSet, InjectBreathers } from "../utils/Random"
import { Workout } from "../models/Workout"
import ActiveWorkout from "../components/ActiveWorkout"
import WakeLock from "../components/WakeLock"


export function WorkOutPage() {
  const [query] = useSearchParams()
  const workoutCount = parseInt(query.get('duration') ?? '0')

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [completedWorkouts, setCompletedWorkouts] = useState<number>(0)
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)
  const [playingWorkout, setPlayingWorkout] = useState(false)
  const [workoutTimer, setWorkoutTimer] = useState<number>(0)
  const workoutInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    const randomWorkouts = GetRandomSet(AppState.workouts, workoutCount)
    const injectedBreathers = InjectBreathers(randomWorkouts)
    setWorkouts(injectedBreathers)
    logger.log('🏋️', injectedBreathers)
  }, [])

  useEffect(() => {
    if (!playingWorkout) return

    workoutInterval.current = setInterval(tickWorkoutTimer, 1000)

    return () => clearInterval(workoutInterval.current)
  }, [playingWorkout, activeWorkout])

  function playWorkout() {
    logger.log('▶️')
    setPlayingWorkout(true)
    if (!activeWorkout) setActiveWorkout(workouts[completedWorkouts])
  }

  function stopWorkout() {
    logger.log('⏸️')
    setPlayingWorkout(false)
  }

  function tickWorkoutTimer() {
    setWorkoutTimer(t => {
      if (!activeWorkout) { return t }
      // logger.log('⌚', t + 1, activeWorkout?.duration / 1000)
      const currentTime = t + 1
      if (currentTime >= (activeWorkout?.duration / 1000)) nextWorkout()
      return currentTime
    })
  }

  function nextWorkout() {
    logger.log('⏭️')
    setWorkoutTimer(0)
    const nextWorkoutNum = completedWorkouts + 1
    setCompletedWorkouts(nextWorkoutNum)
    setActiveWorkout(workouts[nextWorkoutNum])
  }

  return (
    <section className="container-md px-1 py-2 flex-grow-1 d-flex flex-column">
      <WakeLock keepAlive={playingWorkout}></WakeLock>
      <div className="d-flex flex-column flex-grow-1 justify-content-between">

        <article className="card">
          <div className="card-body">
            <div className="d-flex justify-content-around workout-progress" style={{ '--progress-width': `${(completedWorkouts / workouts.length) * 100}%` } as React.CSSProperties}>
              {workouts.map((workout, i) => {
                if (workout == AppState.breather) return (
                  <i key={`dot-${i}`} className="mdi mdi-circle-small opacity-50"></i>
                )

                if (workout == activeWorkout) return (
                  <i key={`dot-${i}`} className="mdi mdi-circle"></i>
                )

                if (i <= completedWorkouts) return (
                  <i key={`dot-${i}`} className="mdi mdi-circle"></i>
                )

                return (
                  <i key={`dot-${i}`} className="mdi mdi-circle-outline opacity-50"></i>
                )
              })}
            </div>
          </div>
        </article>

        <ActiveWorkout workout={activeWorkout} workoutPlayState={playingWorkout}></ActiveWorkout>

        <article className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center workout-controls">
              <section className="workout-timer">
                <i className="mdi mdi-timer me-2 text-primary"></i>
                <span>{workoutTimer}</span>
              </section>

              <section >
                {playingWorkout ?
                  (
                    <button className="btn btn-primary" onClick={stopWorkout}>
                      <i className="mdi mdi-pause fs-1"></i>
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={playWorkout}>
                      <i className="mdi mdi-play fs-1"></i>
                    </button>
                  )
                }
              </section>
            </div>
          </div>
        </article>

      </div>
    </section>
  )
}