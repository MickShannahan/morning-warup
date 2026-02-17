import { createHashRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { accountService } from './services/AccountService.ts';
import AuthGuard from './utils/AuthGuard.js';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import AccountPage from './pages/AccountPage.tsx';


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
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "account",
        element:
          <AuthGuard>
            <AccountPage />
          </AuthGuard>,
      },
    ],
  },
]);