import React from 'react'

import { UserProvider } from './contexts/UserProvider'
import { DataProvider } from './contexts/DataProvider'
import { TaskProvider } from './contexts/TaskProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
      <UserProvider>
        <TaskProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </TaskProvider>
      </UserProvider>
  )
}

export default App
