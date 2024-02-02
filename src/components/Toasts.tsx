import { Toast, ToastContainer } from "react-bootstrap"
import { useCustomToast } from "../hooks/toast"

const Toasts = () => {
    const { toast, hideCustomToast } = useCustomToast()

    const handleCloseToast = () => {
        hideCustomToast()
    }

    return (
        <ToastContainer position="top-center" style={{ paddingTop: "75px" }}>
            {toast && (
                <Toast
                    onClose={handleCloseToast}
                    show={true}
                    delay={5000}
                    autohide
                    bg={toast.type}>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    )
}

export default Toasts
