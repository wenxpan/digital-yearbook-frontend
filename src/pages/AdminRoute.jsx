import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  if (!user.isAdmin) {
    if (!user.isLoggedIn) {
      return <Navigate to="/" replace />
    }
    return <Navigate to="/account" replace />
  }
  return children
}

export default AdminRoute
