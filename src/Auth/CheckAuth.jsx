import { useEffect } from "react"
import { Axios } from "../API/Axios"
import { baseURL2 } from "../API/Api"
import { Outlet, useNavigate } from "react-router-dom"

export default function CheckAuth() {
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Axios.get(`${baseURL2}/check`)
                navigate('/dashboard')
            } catch (err) {
                console.error('Token validation failed', err)
                navigate('/login')
            }
        }

        fetchData()
    }, [navigate])

    return <Outlet />
}
