import React, { useContext, useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import Loading from '../components/Loading'

import { UserContext } from '../contexts/UserProvider'


const RootLayout = () => {
  const result = useLoaderData()
  const { user, setUserResponse, setUser, userLoading } = useContext(UserContext)

  useEffect(() => {
    setUser(result.data)
    setUserResponse(null)
  }, [result])

  return (
    <>  
      <Header user={user} />
      <main>
          <SideMenu />
          {userLoading && <Loading />}
          {!userLoading && 
          <div className="content">
            <Outlet />
          </div>}
      </main>
    </>
  )
}

export default RootLayout
