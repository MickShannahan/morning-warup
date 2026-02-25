import { AppState } from "../AppState";


export default function StreakWeek() {

  const weekdays = [
    { long: 'Sunday', short: 'Sun', char: 'S' },
    { long: 'Monday', short: 'Mon', char: 'M' },
    { long: 'Tuesday', short: 'Tue', char: 'T' },
    { long: 'Wednesday', short: 'Wed', char: 'W' },
    { long: 'Thursday', short: 'Thu', char: 'H' },
    { long: 'Friday', short: 'Fri', char: 'F' },
    { long: 'Saturday', short: 'Sat', char: 'S' }
  ]
  const today = new Date()
  const todayNumber = today.getDay()
  const thisWeekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - todayNumber + i)
    return date.toLocaleDateString()
  })

  function inStreak(dateString: string): boolean {
    return AppState.currentStreak.includes(dateString)
  }


  return (
    <section>
      <div className="fw-bold fs-4"><i className="mdi mdi-fire text-danger"></i> <span className="text-primary">{AppState.currentStreak.length} days</span></div>
      <section className="text-secondary">
        Longest streak: {AppState.longestStreak}
      </section>

      <section className="d-flex justify-content-around text-secondary">
        {weekdays.map((day, di) => {
          return (
            <div key={day.long} style={{ '--bs-bg-opacity': 0.6 }} className={`text-center fw-bold p-2 rounded ${di == todayNumber ? 'bg-white' : ''}`}>
              <div>{day.short}</div>
              {
                inStreak(thisWeekDays[di]) ?
                  (<i className="mdi mdi-circle text-primary"></i>)
                  :
                  (<i className="mdi mdi-circle-outline text-secondary"></i>)
              }

            </div>
          )
        })}
      </section>

    </section>
  )
}