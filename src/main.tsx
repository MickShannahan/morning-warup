import './assets/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.js'
import { StrictMode } from 'react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)