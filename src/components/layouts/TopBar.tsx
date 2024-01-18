import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Container,
    Nav,
    NavDropdown,
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarText,
    NavbarToggle,
} from "react-bootstrap"
import { useAuthContext } from "../../context/UserContext"

const TopBar = () => {
    const { authenticated, logout } = useAuthContext()

    return (
        <Navbar expand="lg" className="bg-primary bg-gradient" fixed="top">
            <Container>
                <NavbarBrand href="#home" className="text-light">
                    <FontAwesomeIcon
                        icon={faBullseye}
                        className="text-danger pb-1"
                    />{" "}
                    <span className="h2">DreamerZ</span>
                </NavbarBrand>
                {authenticated ? (
                    <>
                        <NavbarToggle aria-controls="navbar-nav" />
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
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </NavbarCollapse>
                    </>
                ) : (
                    <>
                        <NavbarText className="justify-content-end d-flex h5">
                            <NavLink
                                href="/register"
                                className="ml-auto text-light px-2">
                                Registre-se
                            </NavLink>
                            <NavLink
                                href="/login"
                                className="ml-auto text-light">
                                Login
                            </NavLink>
                        </NavbarText>
                    </>
                )}
            </Container>
        </Navbar>
    )
}

export default TopBar
