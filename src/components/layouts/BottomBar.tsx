import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import { Col, NavLink, Navbar, NavbarText, Row } from "react-bootstrap"

export default class BottomBar extends Component {
    render() {
        return (
            <Navbar
                expand="lg"
                fixed="bottom"
                className="bg-primary bg-gradient justify-content-center text-center">
                <Row>
                    <Col>
                        <NavbarText className="text-light">
                            Made with{" "}
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="text-danger"
                            />{" "}
                            by Yago Lagrotti Bracco
                        </NavbarText>
                        <NavLink href="">
                            <NavbarText className="text-light">
                                Clique aqui para ver o repositório
                            </NavbarText>
                        </NavLink>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}
