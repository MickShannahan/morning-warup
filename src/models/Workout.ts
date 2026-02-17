let id = 0
type WorkoutData = {
  name: string
  img: string
  type?: string
  duration?: number
  coolDown?: number
}

export class Workout {
  id: number
  name: string
  img: string
  type: string
  duration: number
  coolDown: number


  constructor(data: WorkoutData) {
    this.id = ++id
    this.name = data.name
    this.img = data.img
    this.type = data.type ?? 'timed'
    this.duration = data.duration ?? 1000 * 60
    this.coolDown = data.coolDown ?? 1000 * 10
  }
}