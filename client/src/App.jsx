import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './pages/RootLayout'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import SingUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import ShowProfilePage from './pages/ShowProfilePage'
import EditProfilePage from './pages/EditProfilePage'

import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './contexts/UserProvider'
import { ErrorAndFetchingProvider } from './contexts/ErrorAndFetchingProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'signup', element: <SingUpPage />},
      {path: 'login', element: <LogInPage />},
      {
        path: 'profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
        children: [
          {index: true, element: <ShowProfilePage />},
          {path: 'edit-profile', element: <EditProfilePage />}
        ]
      },
    ]
  },
])

const App = () => {
  return (
    <ErrorAndFetchingProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ErrorAndFetchingProvider>
  )
}

export default App
