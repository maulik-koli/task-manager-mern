import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

import { UserContext } from '../contexts/UserProvider'
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import Loading from '../components/Loading'

const RootLayout = ({ userLoading }) => {
  const { user } = useContext(UserContext)
  const { setResponseMessage } = useContext(ErrorAndFetchingContext)

  useEffect(() => {
    setResponseMessage(null)
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
