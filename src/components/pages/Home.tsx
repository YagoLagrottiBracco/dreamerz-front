import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Component } from "react"
import { Container } from "react-bootstrap"

export default class Home extends Component {
    render() {
        return (
            <Container>
                <div className="text-center">
                    <h1 className="display-1">
                        <FontAwesomeIcon
                            icon={faBullseye}
                            className="text-danger"
                        />
                    </h1>
                    <h1 className="display-1 fw-bolder font-monospace">
                        DreamerZ
                    </h1>
                    <h4>
                        <p className="lead">
                            <span className="fw-semibold fst-italic">
                                Seu melhor organizador de sonhos, com métodos
                                que irão impulsionar seus objetivos para um novo
                                horizonte, suas conquistas estão aqui, use
                                gratuitamente!
                            </span>
                        </p>
                        <p className="fw-light text-decoration-underline">
                            Não perca tempo e cadastre-se agora mesmo!
                        </p>
                    </h4>
                </div>
            </Container>
        )
    }
}
