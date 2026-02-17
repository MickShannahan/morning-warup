

export class Time {
  static seconds(timeInSeconds: number) {
    return 1000 * timeInSeconds
  }

  static minutes(timeInMinutes: number) {
    return 1000 * 60 * timeInMinutes
  }
}