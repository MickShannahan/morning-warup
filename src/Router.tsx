import { createHashRouter } from 'react-router-dom';
import { App } from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import { WorkOutPage } from './pages/WorkoutPage.tsx';


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "workout",
        element: <WorkOutPage />,
      },

    ],
  },
]);