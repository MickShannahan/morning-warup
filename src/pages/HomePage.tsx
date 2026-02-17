import { useEffect, useState } from "react";
import { logger } from "../utils/Logger";
import { Time } from "../utils/easyTimes";



function TimeButtons() {
  const timeOptions = [
    {
      title: '5 min',
      time: Time.minutes(5)
    },
    {
      title: '7 min',
      time: Time.minutes(7)
    },
    {
      title: '10 min',
      time: Time.minutes(10)
    },
    {
      title: '12 min',
      time: Time.minutes(12)
    },
    {
      title: '15 min',
      time: Time.minutes(15)
    },
  ]
  return timeOptions.map((opt) => {
    return (
      <button className="btn btn-light">{opt.title}</button>
    )
  })
}


export default function HomePage() {

  const [todayDate, setTodayDate] = useState(new Date())
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    logger.log('on mount')
    setInterval(() => {
      setTodayDate(new Date())
    }, 1000)
  }, [])

  return (
    <div className="home-page container-md p-1">
      <div className="card shadow">
        <div className="card-body">
          <div className="fw-bold">{weekdays[todayDate.getDay()]}</div>
          <div>{todayDate.toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' })}</div>
        </div>
        <div className="card-body">
          <section className="d-flex justify-content-between">
            <TimeButtons />
          </section>
        </div>
      </div>
    </div>
  )
}