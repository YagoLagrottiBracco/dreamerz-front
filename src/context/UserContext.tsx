import { createContext, ReactNode, useContext } from "react"
import useAuth from "../hooks/useAuth"

interface User {
    email: string
    password: string
}

interface AuthContextProps {
    authenticated: boolean
    register: (user: User) => void
    logout: () => void
    login: (user: User) => void
}

const Context = createContext<
    AuthContextProps | (() => AuthContextProps) | undefined
>(undefined)

interface UserProviderProps {
    children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
    const { authenticated, register, logout, login } = useAuth()

    return (
        <Context.Provider value={{ authenticated, register, logout, login }}>
            {children}
        </Context.Provider>
    )
}

function useAuthContext(): AuthContextProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error("useAuthContext must be used within a UserProvider")
    }

    return typeof context === "function" ? context() : context
}

export { useAuthContext, UserProvider }
