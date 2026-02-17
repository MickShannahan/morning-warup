import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.ts"
import { Account } from './models/Account.js'
import { Identity } from '@bcwdev/auth0provider-client'
import { Workout } from "./models/Workout.ts"
import defaultGif from './assets/img/example_workouts/default.gif'


class ObservableAppState {

  identity: Identity | null = null
  account: Account | null = null
  workouts: Workout[]

  constructor() {
    this.workouts = [
      new Workout({
        name: 'Hops',
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
        name: 'Golf Swing',
        img: defaultGif,
      }),
      new Workout({
        name: 'Back Lunges',
        img: defaultGif,
      }),
    ]
    makeAutoObservable(this)
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