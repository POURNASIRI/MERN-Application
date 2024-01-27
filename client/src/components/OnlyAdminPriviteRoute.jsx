import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function OnlyAdminPriviteRoute() {

    const {currentUser} = useSelector(state => state.user)
  return (
    <div>
        {
            currentUser?.isAdmin === true ? <Outlet/> : <Navigate to={"/"}/>
        }
    </div>
  )
}
