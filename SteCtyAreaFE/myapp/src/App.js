import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import AddState from './Components/AddState'
import AddCity from './Components/AddCity'
import AddArea from './Components/AddArea'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <div>
      <>
      <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path='' element={<DashBoard/>}>
           <Route path='addstate' element={<AddState/>}/>
           <Route path='addcity' element={<AddCity/>}/>
           <Route path='addarea' element={<AddArea/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </>
    </div>
  )
}
