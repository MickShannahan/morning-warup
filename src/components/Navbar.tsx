import { Link } from "react-router-dom";
import './Navbar.scss'
import { useEffect, useState } from 'react';

export function Navbar() {

  const [theme, setTheme] = useState('')

  useEffect(() => {
    const theme = localStorage.getItem('theme') || document.documentElement.getAttribute('data-bs-theme') || 'light'
    setTheme(theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [])

  function toggleTheme() {
    const newTheme = theme == 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-bs-theme', newTheme)
    setTheme(newTheme)
  }

  function ThemeToggler() {
    return (
      <button className='btn' onClick={toggleTheme} title='Toggle light/dark mode'>
        <i className={`text-white mdi ${theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}`}></i>
      </button>
    )
  }


  return (
    <nav className="container-fluid p-1">
      <div className="card px-3">
        <section className="d-flex align-items-center justify-content-between">
          <div><i className="mdi mdi-account-circle fs-3 text-primary"></i></div>
          <div>
            <img className="logo" src="" alt="" />
            <Link to={'/'}>
              <span className="fs-4 fw-bold text-dark">Uma Workout</span>
            </Link>
          </div>
          <div>
            <i className="mdi mdi-cog"></i>
          </div>
        </section>
      </div>
    </nav>
  )
}