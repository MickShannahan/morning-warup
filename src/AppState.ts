import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.ts"
import { Account } from './models/Account.js'
import { Identity } from '@bcwdev/auth0provider-client'
import { Workout } from "./models/Workout.ts"
import defaultGif from './assets/img/example_workouts/default.gif'
import defaultBreather from './assets/img/example_workouts/defaultBreather.gif'
import { Time } from "./utils/easyTimes.ts"
import { streakService } from "./services/StreakService.ts"


class ObservableAppState {

  currentStreak: string[]
  longestStreak: number
  streakStart: Date
  workouts: Workout[]
  breather: Workout

  constructor() {
    this.workouts = [
      new Workout({
        name: 'Hops',
        img: defaultGif,
      }),
      new Workout({
        name: 'Body Wave',
        img: defaultGif,
      }),
      new Workout({
        name: 'Alternating Arm Swing',
        img: defaultGif,
      }),
      new Workout({
        name: 'Marches',
        img: defaultGif,
      }),
      new Workout({
        name: 'Waist Twist',
        img: defaultGif,
      }),
      new Workout({
        name: 'Wide Arm Step Back',
        img: defaultGif,
      }),
      new Workout({
        name: 'Dead Arms',
        img: defaultGif,
      }),
      new Workout({
        name: 'Wind Mill',
        img: defaultGif,
      }),
      new Workout({
        name: 'Squatting Back Shake',
        img: defaultGif,
      }),
      new Workout({
        name: 'Golf Swing',
        img: defaultGif,
      }),
      new Workout({
        name: 'Ballet Squats',
        img: defaultGif,
      }),
      new Workout({
        name: 'Trunk Twists',
        img: defaultGif,
      }),
      new Workout({
        name: 'Forward Arm Rotations',
        img: defaultGif,
      }),
      new Workout({
        name: 'Backward Arm Rotations',
        img: defaultGif,
      }),
      new Workout({
        name: 'Backward Wave Lunges',
        img: defaultGif,
      }),
      new Workout({
        name: 'Plank',
        img: defaultGif,
      }),
      new Workout({
        name: 'Pushups',
        img: defaultGif,
      }),
    ]
    this.breather = new Workout({
      name: 'Breather',
      img: defaultBreather,
      duration: Time.seconds(10),
      coolDown: 0
    })
    makeAutoObservable(this)
    this.currentStreak = []
    this.longestStreak = 0
    this.streakStart = new Date()
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop: string) {
    isValidProp(target, prop)
    // @ts-ignore
    return target[prop]
  },
  set(target, prop: string, value) {
    isValidProp(target, prop)
    action(() => {
      // @ts-ignore
      target[prop] = value
    })()
    return true
  }
})