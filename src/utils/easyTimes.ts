

export class Time {
  static seconds(timeInSeconds: number) {
    return 1000 * timeInSeconds
  }

  static minutes(timeInMinutes: number) {
    return 1000 * 60 * timeInMinutes
  }

  static hours(timeInHours: number) {
    return 1000 * 60 * 60 * timeInHours
  }

  static days(timeInDays: number) {
    return 1000 * 60 * 60 * 24 * timeInDays
  }
}