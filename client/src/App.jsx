import React from 'react'

import { ErrorAndFetchingProvider } from './contexts/ErrorAndFetchingProvider'
import { UserProvider } from './contexts/UserProvider'
import { DataProvider } from './contexts/DataProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
    <DataProvider>
      <ErrorAndFetchingProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ErrorAndFetchingProvider>
    </DataProvider>
  )
}

export default App
