import React from 'react'
import Header from './_components/Header'
import Dashboard from './page'

function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='mt-10 md:mt-20 lg:mt-28 mx-5 md:mx-20 lg:mx-36'>
      {children}
      </div>
      
    </div>
  )
}

export default DashboardLayout