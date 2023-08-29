import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const LoggedInRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  if (!user.loaded) {
    return <p>Loading...</p>
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}

export default LoggedInRoute
