import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'
import ProjectPage from './pages/ProjectPage'
import RootLayout from './pages/RootLayout'
import ErrorPage from './pages/ErrorPage'
import SignUpLogIn from './pages/SignUpLogIn'

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
    ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
