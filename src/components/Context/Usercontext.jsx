import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0)

import React from 'react'

export default function UsercontextProvider(props) {
    
    const [userLogin, setuserLogin] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem('Token')!== null)
            setuserLogin(localStorage.getItem('Token'))
    })

  return <UserContext.Provider value={{userLogin , setuserLogin}}>
    {props.children}
  </UserContext.Provider>
}
