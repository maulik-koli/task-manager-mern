import React from 'react'

import { ErrorAndFetchingProvider } from './contexts/ErrorAndFetchingProvider'
import { UserProvider } from './contexts/UserProvider'
import AppRoutes from './router/AppRoutes'

const App = () => {
  return (
    <ErrorAndFetchingProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ErrorAndFetchingProvider>
  )
}

export default App
