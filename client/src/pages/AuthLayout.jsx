import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

import { UserContext } from '../contexts/UserProvider'

const AuthLayout = () => {
  const { setUserResponse } = useContext(UserContext)

  useEffect(() => {
    setUserResponse(null)
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
