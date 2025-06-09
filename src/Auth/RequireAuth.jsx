import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function RequireAuth({allowedRoles}){

  const { user } = useContext(AuthContext)

  return(
    allowedRoles.includes(user?.type) ? <Outlet /> : <Navigate to="/login" replace />
  )
}