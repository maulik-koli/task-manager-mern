import React from 'react'

import { UserProvider } from './contexts/UserProvider'
import { DataProvider } from './contexts/DataProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
    <DataProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </DataProvider>
  )
}

export default App
