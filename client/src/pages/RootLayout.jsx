import React, { useEffect, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { userProfile } from '../api/userApi'
import { formatDate } from '../utils/fuctions'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const RootLayout = () => {
  const { setUser } = useContext(UserContext)
  const { setIsFetching } = useContext(ErrorAndFetchingContext)

  const navigate = useNavigate()

  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     setIsFetching(true)
  //     const url = "http://localhost:3000/users/me"
  //     const result = await userProfile(url)
      
  //     if(result.status === 401) {
  //       navigate('/signuplogin')
  //       setUser(null)
  //       return
  //     }
      
  //     console.log(result)
  //     result.data.createdAt = formatDate(result.data.createdAt)
  //     setUser(result.data)
  //   }
    
  //   getUserProfile()
  //   setIsFetching(false)
  // }, [navigate])

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

export default RootLayout
