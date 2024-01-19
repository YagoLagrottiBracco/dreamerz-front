import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from "react-bootstrap"
import { Options } from "../../Forms"
import Modals from "../../Modals"
import "./Dreams.css"

const Dreams = () => {
    const [show, setShow] = useState(false)
    const [inputs, setInputs] = useState<Options[]>([])
    const [nameModal, setNameModal] = useState("")

    const inputsGoal: Options[] = [
        {
            label: "Insira o nome do objetivo",
            title: "nome",
            name: "name",
            placeholder: "Comprar tijólos",
            type: "text",
            small: { active: false, text: null },
            items: null,
        },
        {
            label: "Insira a descrição do objetivo",
            title: "descrição",
            name: "description",
            placeholder:
                "Preciso comprar tijólos para poder construir minha casa",
            type: "textarea",
            small: { active: false, text: null },
            items: null,
        },
        {
            label: "Insira a dificuldade do objetivo",
            title: "",
            name: "difficulty",
            placeholder: "",
            type: "select",
            small: { active: false, text: null },
            items: [
                { value: "easy", text: "Fácil" },
                { value: "medium", text: "Médio" },
                { value: "hard", text: "Difícil" },
            ],
        },
    ]

    const inputsAction: Options[] = [
        {
            label: "Insira o nome da ação",
            title: "nome",
            name: "name",
            placeholder: "Comprar tijólos",
            type: "text",
            small: { active: false, text: null },
            items: null,
        },
        {
            label: "Insira a descrição da ação",
            title: "descrição",
            name: "description",
            placeholder:
                "Preciso comprar tijólos para poder construir minha casa",
            type: "textarea",
            small: { active: false, text: null },
            items: null,
        },
        {
            label: "Insira a dificuldade da ação",
            title: "",
            name: "difficulty",
            placeholder: "",
            type: "select",
            small: { active: false, text: null },
            items: [
                { value: "easy", text: "Fácil" },
                { value: "medium", text: "Médio" },
                { value: "hard", text: "Difícil" },
            ],
        },
        {
            label: "Insira a data término da ação",
            title: "data término",
            name: "doneIn",
            placeholder: "01/01/2024",
            type: "date",
            small: {
                active: true,
                text: "Insira aqui a data limite que você pretende executar esta ação.",
            },
            items: null,
        },
    ]

    const handleModal = () => setShow(true)

    const handleOptionsModal = (form: string) => {
        if (form === "goal") {
            setInputs(inputsGoal)
            setNameModal("Objetivo")
        } else if (form === "action") {
            setInputs(inputsAction)
            setNameModal("Execução")
        }
    }

    return (
        <Container className="my-5 py-5 text-center">
            <Card>
                <CardHeader className="bg-info bg-opacity-25">
                    <h3 className="fst-italic">Sonhos</h3>
                </CardHeader>
                <CardBody className="bg-info bg-opacity-10 overflow-x-scroll scroll">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Card
                                    className="overflow-scroll scroll scroll-dream"
                                    style={{ height: "68vh" }}>
                                    <CardHeader className="bg-primary bg-opacity-75">
                                        <span className="h3">
                                            Sonho 1
                                            <Button
                                                onClick={() => {
                                                    handleModal()
                                                    handleOptionsModal("goal")
                                                }}
                                                variant="outline-primary"
                                                size="lg"
                                                className="p-0 mx-2">
                                                <FontAwesomeIcon
                                                    icon={faSquarePlus}
                                                    className="text-light px-2 pt-1 m-0"
                                                />
                                            </Button>
                                        </span>
                                    </CardHeader>
                                    <CardBody className="bg-primary bg-opacity-25 ">
                                        <span className="small">
                                            Lorem ipsum dolor sit amet...
                                        </span>
                                        <Container>
                                            <Card
                                                className="overflow-y-scroll my-3 scroll"
                                                style={{
                                                    maxHeight: "70vh",
                                                }}>
                                                <CardHeader className="bg-success">
                                                    <span className="h6">
                                                        Objetivo 1
                                                        <Button
                                                            onClick={() => {
                                                                handleModal()
                                                                handleOptionsModal(
                                                                    "action"
                                                                )
                                                            }}
                                                            variant="outline-success"
                                                            size="lg"
                                                            className="p-0 mx-2">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faSquarePlus
                                                                }
                                                                className="text-light px-2 pt-1 m-0"
                                                            />
                                                        </Button>
                                                    </span>
                                                </CardHeader>
                                                <CardBody className="bg-success bg-opacity-50">
                                                    <Container>
                                                        <span className="small">
                                                            Lorem ipsum dolor
                                                            sit amet...
                                                        </span>
                                                        <Card className="my-2">
                                                            <CardHeader className="bg-danger bg-opacity-75">
                                                                <span className="fw-semibold">
                                                                    Execução 1
                                                                </span>
                                                            </CardHeader>
                                                            <CardBody className="bg-danger bg-opacity-10">
                                                                <span className="small">
                                                                    Lorem ipsum
                                                                    dolor sit
                                                                    amet...
                                                                </span>
                                                            </CardBody>
                                                        </Card>
                                                        <Card className="my-2">
                                                            <CardHeader className="bg-warning bg-opacity-75">
                                                                <span className="fw-semibold">
                                                                    Execução 2
                                                                </span>
                                                            </CardHeader>
                                                            <CardBody className="bg-warning bg-opacity-10">
                                                                <span className="small">
                                                                    Lorem ipsum
                                                                    dolor sit
                                                                    amet...
                                                                </span>
                                                            </CardBody>
                                                        </Card>
                                                    </Container>
                                                </CardBody>
                                            </Card>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
            <Modals
                show={show}
                onHide={() => setShow(false)}
                options={inputs}
                name={nameModal}
            />
        </Container>
    )
}

export default Dreams
