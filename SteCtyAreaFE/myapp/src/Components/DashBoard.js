import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function DashBoard() {
  return (
    <div>
        <h3 className='text-center text-primary'>DashBoard for mapping</h3>
      <Link to="addstate" className='btn btn-primary m-3' >AddState</Link>
      <Link to="addcity" className='btn btn-primary m-3' >addcity</Link>
      <Link to="addarea" className='btn btn-primary m-3' >addarea</Link>

      <Outlet/>
    </div>
   
  )
}
