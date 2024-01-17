import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React from "react"
import ReactDOM from "react-dom/client"
import Footer from "./components/layouts/BottomBar"
import Navigationbar from "./components/layouts/TopBar"
import Home from "./components/pages/Home"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Navigationbar />
        <Home />
        <Footer />
    </React.StrictMode>
)
