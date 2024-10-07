import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'

const AuthLayout = () => {
  const { setResponseMessage } = useContext(ErrorAndFetchingContext)

  useEffect(() => {
    setResponseMessage(null)
  }, [])

  return (
    <>  
      <Header />
      <main>
          <SideMenu />
          <div className="content">
            <Outlet />
          </div>
      </main>
    </>
  )
}

export default AuthLayout
