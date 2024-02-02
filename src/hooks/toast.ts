import { useToast } from "../context/ToastContext"

export const useCustomToast = () => {
    const { showToast, hideToast, toast } = useToast()

    const showCustomToast = (type: string, message: string) => {
        showToast({ type, message })
    }

    const hideCustomToast = () => {
        hideToast()
    }

    return {
        showCustomToast,
        hideCustomToast,
        toast,
    }
}
