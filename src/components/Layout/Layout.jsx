import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  const [counter, setcounter] = useState(0)

  useEffect(() => {

  }, [])


  return (
    <>
      <Navbar />
      <div className="mt-20 container m-auto ">
        <Outlet />
      </div>
    </>
  )
}
