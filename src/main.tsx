import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React from "react"
import { Container } from "react-bootstrap"
import ReactDOM from "react-dom/client"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import BottomBar from "./components/layouts/BottomBar"
import TopBar from "./components/layouts/TopBar"
import Home from "./components/pages/Home"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <TopBar />
            <div
                className="fluid bg-light bg-gradient d-flex align-items-center justify-content-center"
                style={{ minHeight: "89vh" }}>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Container>
            </div>
            <BottomBar />
        </Router>
    </React.StrictMode>
)
