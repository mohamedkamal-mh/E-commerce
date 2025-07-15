import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {
  const [counter, setcounter] = useState(0)

  useEffect(() => {

  }, [])


  return (

    <>
      <div className="container">
        <h4 className='font-bold text-3xl text-blue-950 bg-sky-200  fixed bottom-0 end-0 start-0 text-center'>Footer</h4>
      </div>
    </>
  )
}
