import React from 'react'

import { UserProvider } from './contexts/UserProvider'
import { DataProvider } from './contexts/DataProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
      <UserProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
      </UserProvider>
  )
}

export default App
