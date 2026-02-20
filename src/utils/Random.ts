import { AppState } from "../AppState"
import { Workout } from "../models/Workout"



export function GetRandomSet(list: Array<any>, count: number) {
  const randomSorted = list.toSorted(() => Math.random() - .5)
  return randomSorted.slice(0, count)
}

export function InjectBreathers(list: Array<Workout>): Workout[] {
  let out: Workout[] = []
  const breather = AppState.breather
  for (let i = 0; i < list.length; i++) {
    const workout = list[i]
    out.push(workout)
    if (i !== list.length - 1) out.push(breather)
  }
  return out
}