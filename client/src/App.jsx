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

import { UserProvider } from './contexts/UserProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'signup', element: <SingUpPage />},
      {path: 'login', element: <LogInPage />},
      {
        path: 'profile',
        element: <ProfilePage />,
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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
