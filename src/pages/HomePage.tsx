import { useEffect, useState } from "react";
import { logger } from "../utils/Logger";
import { Link } from "react-router-dom";



function TimeButtons() {
  const timeOptions = [
    {
      title: '5 min',
      time: 5
    },
    {
      title: '7 min',
      time: 7
    },
    {
      title: '10 min',
      time: 10
    },
    {
      title: '12 min',
      time: 12
    },
    {
      title: '15 min',
      time: 15
    },
  ]
  return timeOptions.map((opt) => {
    return (
      <Link to={`workout?duration=${opt.time}`} key={opt.title}>
        <button className="btn btn-light">{opt.title}</button>
      </Link>
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