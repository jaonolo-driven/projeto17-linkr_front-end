import React from 'react'
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import UserContext from "../../contexts/UserContext"

const AuthRoutesController = ({ needsUser }) => {
    const [ user, setUser ] = useContext(UserContext)
    const fallback = needsUser ? '/' : '/timeline'

    if((user === null) === needsUser)
        return <Navigate to={fallback}/>

    return <Outlet/>
}

export default AuthRoutesController