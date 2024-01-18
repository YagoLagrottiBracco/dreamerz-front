import { createContext, ReactNode, useContext } from "react"
import useAuth from "../hooks/useAuth"

interface AuthContextProps {
    authenticated: boolean
    register: (user: unknown) => void
    logout: () => void
    login: (user: unknown) => void
}

const Context = createContext<AuthContextProps | undefined>(undefined)

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
    return context
}

export { useAuthContext, UserProvider }
