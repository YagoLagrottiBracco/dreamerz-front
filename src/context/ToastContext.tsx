import { ReactNode, createContext, useContext, useState } from "react"

interface Toast {
    type: string
    message: string
}

interface ToastContextType {
    showToast: (toast: Toast) => void
    hideToast: () => void
    toast: Toast | null
}

interface ToastProviderProps {
    children: ReactNode
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: ToastProviderProps) {
    const [toast, setToast] = useState<Toast | null>(null)

    const showToast = (newToast: Toast) => {
        setToast(newToast)
    }

    const hideToast = () => {
        setToast(null)
    }

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}
