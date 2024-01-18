import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import {
    Container,
    Nav,
    NavDropdown,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
} from "react-bootstrap"

export default class TopBar extends Component {
    render() {
        return (
            <Navbar expand="lg" className="bg-primary bg-gradient" fixed="top">
                <Container>
                    <NavbarBrand href="#home" className="text-light">
                        <FontAwesomeIcon
                            icon={faBullseye}
                            className="text-danger"
                        />{" "}
                        DreamerZ
                    </NavbarBrand>
                    <NavbarToggle aria-controls="navbar-nav"/>
                    <NavbarCollapse
                        id="navbar-nav"
                        className="justify-content-end">
                        <Nav className="ml-auto">
                            <NavDropdown
                                title={
                                    <span className="text-light">
                                        Olá #COLOCAR-NOME-DE-USUÁRIO
                                    </span>
                                }
                                id="nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">
                                    Editar Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">
                                    Visualizar seus sonhos
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">
                                    Criar um novo sonho
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        )
    }
}
