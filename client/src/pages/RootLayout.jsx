import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const RootLayout = () => {
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
