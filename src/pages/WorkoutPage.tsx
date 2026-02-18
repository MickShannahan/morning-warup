import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { logger } from "../utils/Logger"


export function WorkOutPage() {
  const [query] = useSearchParams()
  const workouts = parseInt(query.get('duration') ?? '0')
  useEffect(() => {
    logger.log('Q', workouts)
  }, [])

  return (
    <section className="container-md px-1 py-2 flex-grow-1 d-flex flex-column">
      <div className="d-flex flex-column flex-grow-1 justify-content-between">

        <article className="card">
          <div className="card-body">workout header</div>
        </article>

        <div>workout active</div>

        <article className="card">
          <div className="card-body">
            <div className="d-flex workout-controls">

            </div>
          </div>
        </article>

      </div>
    </section>
  )
}