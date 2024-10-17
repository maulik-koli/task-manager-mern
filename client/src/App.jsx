import React from 'react'

import { ErrorAndFetchingProvider } from './contexts/ErrorAndFetchingProvider'
import { UserProvider } from './contexts/UserProvider'
import { DataProvider } from './contexts/DataProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
    <ErrorAndFetchingProvider>
        <DataProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
      </DataProvider>
    </ErrorAndFetchingProvider>
  )
}

export default App
