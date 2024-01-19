import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React from "react"
import { Container } from "react-bootstrap"
import ReactDOM from "react-dom/client"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import BottomBar from "./components/layouts/BottomBar"
import TopBar from "./components/layouts/TopBar"
import Dashboard from "./components/pages/Dashboard"
import Home from "./components/pages/Home"
import CreateDream from "./components/pages/dream/CreateDream"
import Dreams from "./components/pages/dream/Dreams"
import EditDream from "./components/pages/dream/EditDream"
import Login from "./components/pages/user/Login"
import Register from "./components/pages/user/Register"
import { UserProvider } from "./context/UserContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <UserProvider>
                <TopBar />
                <div
                    className="fluid bg-light bg-gradient d-flex align-items-center justify-content-center"
                    style={{ minHeight: "89vh" }}>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/dashboard/dreams"
                                element={<Dreams />}
                            />
                            <Route
                                path="/dashboard/dreams/create"
                                element={<CreateDream />}
                            />
                            <Route
                                path="/dashboard/dreams/edit/:id"
                                element={<EditDream />}
                            />
                        </Routes>
                    </Container>
                </div>
                <BottomBar />
            </UserProvider>
        </Router>
    </React.StrictMode>
)
