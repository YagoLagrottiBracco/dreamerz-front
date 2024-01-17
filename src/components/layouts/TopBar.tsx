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
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container>
                    <NavbarBrand href="#home">
                        <FontAwesomeIcon icon={faBullseye} /> DreamerZ
                    </NavbarBrand>
                    <NavbarToggle aria-controls="navbar-nav" />
                    <NavbarCollapse id="navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown
                                title="Olá #COLOCAR-NOME-DE-USUÁRIO"
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
