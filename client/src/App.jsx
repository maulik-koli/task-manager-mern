import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'
import ProjectPage from './pages/ProjectPage'
import ErrorPage from './pages/ErrorPage'
import SignUpLogIn from './pages/SignUpLogIn'
import ProfilePage from './pages/ProfilePage'

import { UserProvider } from './contexts/UserProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <HomePage />},
      {path: '/categorie', element: <TaskPage />},
      {path: '/project', element: <ProjectPage />},
      {path: '/signuplogin', element: <SignUpLogIn />},
      {path: '/profile', element: <ProfilePage />},
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
