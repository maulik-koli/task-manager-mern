import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import Loading from '../components/Loading'

import { UserContext } from '../contexts/UserProvider'


const RootLayout = ({ userLoading }) => {
  const { user, setUserResponse } = useContext(UserContext)

  useEffect(() => {
    setUserResponse(null)
  }, [])

  return (
    <>  
      <Header user={user} />
      <main>
          <SideMenu />
          {userLoading && <Loading />}
          {!userLoading && <div className="content">
            <Outlet />
          </div>}
      </main>
    </>
  )
}

export default RootLayout
