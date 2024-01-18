import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"

interface UserData {
    token: string
}

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user: unknown) {
        const data = await api.post("/register", user).then((response) => {
            return response.data
        })

        await authUser(data)
    }

    async function authUser(data: UserData) {
        setAuthenticated(true)

        localStorage.setItem("token", JSON.stringify(data.token))

        return navigate("/dashboard")
    }

    async function login(user: unknown) {
        const data = await api.post("/login", user).then((response) => {
            return response.data
        })

        await authUser(data)
    }

    async function logout() {
        setAuthenticated(false)
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = ""
        navigate("/")
    }

    return { authenticated, register, logout, login }
}