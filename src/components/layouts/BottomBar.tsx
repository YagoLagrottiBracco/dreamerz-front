import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import { Col, Navbar, NavbarText, Row } from "react-bootstrap"

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
                        <br />
                        <NavbarText className="text-light">
                            Clique no link para ver o repositório de{" "}
                            <a href="https://github.com/YagoLagrottiBracco/dreamerz-front">
                                FRONT
                            </a>{" "}
                            ou{" "}
                            <a href="https://github.com/YagoLagrottiBracco/dreamerz-api">
                                API
                            </a>
                        </NavbarText>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}
