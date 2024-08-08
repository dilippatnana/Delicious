import React from 'react'
import DBLeftSection from '../components/DBLeftSection'
import DBRightSection from '../components/DBRightSection'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen bg-primary flex items-center'>
        <DBLeftSection/>
        <DBRightSection/>
    </div>
  )
}

export default Dashboard