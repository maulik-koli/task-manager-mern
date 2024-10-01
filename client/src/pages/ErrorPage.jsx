import React from 'react'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const ErrorPage = () => {
  return (
    <>
        <Header />
        <main>
            <SideMenu />
            <div className='error-page'>
                <h1>404 Not Found</h1>
                <p>Check your url</p>
            </div>
        </main>
    </>
  )
}

export default ErrorPage
