import {
    faPencil,
    faSquarePlus,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import { useEffect, useState } from "react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Row,
} from "react-bootstrap"
import api from "../../../utils/api"
import { Options } from "../../Forms"
import Modals from "../../Modals"
import { Action, Dream, Goal } from "./CreateDream"
import "./Dreams.css"

const Dreams = () => {
    const [show, setShow] = useState(false)
    const [inputs, setInputs] = useState<Options[]>([])
    const [nameModal, setNameModal] = useState("")
    const [dreams, setDreams] = useState<Dream[]>([
        {
            _id: null,
            name: "",
            description: "",
        },
    ])
    const [token] = useState(localStorage.getItem("token") || "")
    const [idUpdate, setIdUpdate] = useState("")
    const [id, setId] = useState("")
    const [type, setType] = useState("")

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
            placeholder: "",
            type: "date",
            small: {
                active: true,
                text: "Insira aqui a data limite que você pretende executar esta ação.",
            },
            items: null,
        },
    ]

    const handleModal = () => setShow(true)

    const handleOptionsModal = async (
        form: string,
        id: string,
        idEdit?: string
    ) => {
        if (form === "goal") {
            setInputs(inputsGoal)
            setNameModal("Objetivo")
            setType("goals")
        } else if (form === "action") {
            setInputs(inputsAction)
            setNameModal("Execução")
            setType("actions")
        }

        setIdUpdate(idEdit || "")
        setId(id)
    }

    const handleDelete = async (id: string, model: string) => {
        api.delete(
            `${import.meta.env.VITE_APP_API_URL}/dashboard/${model}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            }
        ).then(() => {
            window.location.reload()
        })
    }

    useEffect(() => {
        api.get(`${import.meta.env.VITE_APP_API_URL}/dashboard/dreams`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
            .then((response) => {
                setDreams(response.data.dreams)
            })
            .catch((error) => error)
    }, [token])

    return (
        <Container className="my-5 py-5 text-center">
            <Card>
                <CardHeader className="bg-info bg-opacity-25">
                    <h3 className="fst-italic">Sonhos</h3>
                </CardHeader>
                <CardBody className="bg-info bg-opacity-10 overflow-x-scroll scroll">
                    <Container>
                        {(dreams[0].name !== "" &&
                            dreams.map((dream: Dream) => (
                                <Row className="my-4" key={dream._id}>
                                    <Col className="col-12">
                                        <Card
                                            className="overflow-scroll scroll scroll-dream"
                                            style={{ height: "68vh" }}>
                                            <CardHeader className="bg-primary bg-opacity-75">
                                                <span className="h3">
                                                    {dream.name}
                                                    <Button
                                                        onClick={() => {
                                                            handleModal()
                                                            handleOptionsModal(
                                                                "goal",
                                                                dream._id!
                                                            )
                                                        }}
                                                        variant="outline-light"
                                                        size="lg"
                                                        className="p-0 mx-2">
                                                        <FontAwesomeIcon
                                                            icon={faSquarePlus}
                                                            className="text-light px-2 pt-1 m-0"
                                                        />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(
                                                                dream._id!,
                                                                "dreams"
                                                            )
                                                        }}
                                                        variant="outline-light"
                                                        size="lg"
                                                        className="p-0 mx-2">
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            className="text-light px-2 pt-1 m-0"
                                                        />
                                                    </Button>
                                                </span>
                                            </CardHeader>
                                            <CardBody className="bg-primary bg-opacity-25 ">
                                                <span className="small">
                                                    {dream.description}
                                                </span>
                                                <Container>
                                                    {dream.goals &&
                                                        dream.goals.map(
                                                            (goal: Goal) => (
                                                                <Card
                                                                    className="overflow-y-scroll my-3 scroll"
                                                                    style={{
                                                                        maxHeight:
                                                                            "70vh",
                                                                    }}
                                                                    key={
                                                                        goal._id
                                                                    }>
                                                                    <CardHeader
                                                                        className={
                                                                            goal.difficulty ===
                                                                            "easy"
                                                                                ? "bg-success"
                                                                                : goal.difficulty ===
                                                                                  "medium"
                                                                                ? "bg-warning"
                                                                                : "bg-danger"
                                                                        }>
                                                                        <span className="h6">
                                                                            {
                                                                                goal.name
                                                                            }
                                                                            <Button
                                                                                onClick={() => {
                                                                                    handleModal()
                                                                                    handleOptionsModal(
                                                                                        "goal",
                                                                                        goal._id!,
                                                                                        goal._id!
                                                                                    )
                                                                                }}
                                                                                variant="outline-light"
                                                                                size="lg"
                                                                                className="p-0 mx-2">
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faPencil
                                                                                    }
                                                                                    className="text-light px-2 pt-1 m-0"
                                                                                />
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    handleModal()
                                                                                    handleOptionsModal(
                                                                                        "action",
                                                                                        goal._id!
                                                                                    )
                                                                                }}
                                                                                variant="outline-light"
                                                                                size="lg"
                                                                                className="p-0 mx-2">
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faSquarePlus
                                                                                    }
                                                                                    className="text-light px-2 pt-1 m-0"
                                                                                />
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    handleDelete(
                                                                                        goal._id!,
                                                                                        "goals"
                                                                                    )
                                                                                }}
                                                                                variant="outline-light"
                                                                                size="lg"
                                                                                className="p-0 mx-2">
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faTrashCan
                                                                                    }
                                                                                    className="text-light px-2 pt-1 m-0"
                                                                                />
                                                                            </Button>
                                                                        </span>
                                                                    </CardHeader>
                                                                    <CardBody
                                                                        className={
                                                                            goal.difficulty ===
                                                                            "easy"
                                                                                ? "bg-success bg-opacity-50"
                                                                                : goal.difficulty ===
                                                                                  "medium"
                                                                                ? "bg-warning bg-opacity-50"
                                                                                : "bg-danger bg-opacity-50"
                                                                        }>
                                                                        <Container>
                                                                            <span className="small">
                                                                                {
                                                                                    goal.description
                                                                                }
                                                                            </span>
                                                                            {goal.actions &&
                                                                                goal.actions.map(
                                                                                    (
                                                                                        action: Action
                                                                                    ) => (
                                                                                        <Card
                                                                                            className="my-2"
                                                                                            key={
                                                                                                action._id
                                                                                            }>
                                                                                            <CardHeader
                                                                                                className={
                                                                                                    action.difficulty ===
                                                                                                    "easy"
                                                                                                        ? "bg-success bg-opacity-75"
                                                                                                        : action.difficulty ===
                                                                                                          "medium"
                                                                                                        ? "bg-warning bg-opacity-75"
                                                                                                        : "bg-danger bg-opacity-75"
                                                                                                }>
                                                                                                <span className="fw-semibold">
                                                                                                    {
                                                                                                        action.name
                                                                                                    }
                                                                                                    <Button
                                                                                                        onClick={() => {
                                                                                                            handleModal()
                                                                                                            handleOptionsModal(
                                                                                                                "action",
                                                                                                                action._id!,
                                                                                                                action._id!
                                                                                                            )
                                                                                                        }}
                                                                                                        variant="outline-light"
                                                                                                        size="lg"
                                                                                                        className="p-0 mx-2">
                                                                                                        <FontAwesomeIcon
                                                                                                            icon={
                                                                                                                faPencil
                                                                                                            }
                                                                                                            className="text-light px-2 pt-1 m-0"
                                                                                                        />
                                                                                                    </Button>
                                                                                                    <Button
                                                                                                        onClick={() => {
                                                                                                            handleDelete(
                                                                                                                action._id!,
                                                                                                                "actions"
                                                                                                            )
                                                                                                        }}
                                                                                                        variant="outline-light"
                                                                                                        size="lg"
                                                                                                        className="p-0 mx-2">
                                                                                                        <FontAwesomeIcon
                                                                                                            icon={
                                                                                                                faTrashCan
                                                                                                            }
                                                                                                            className="text-light px-2 pt-1 m-0"
                                                                                                        />
                                                                                                    </Button>
                                                                                                </span>
                                                                                            </CardHeader>
                                                                                            <CardBody
                                                                                                className={
                                                                                                    action.difficulty ===
                                                                                                    "easy"
                                                                                                        ? "bg-success bg-opacity-10"
                                                                                                        : action.difficulty ===
                                                                                                          "medium"
                                                                                                        ? "bg-warning bg-opacity-10"
                                                                                                        : "bg-danger bg-opacity-10"
                                                                                                }>
                                                                                                <span className="small">
                                                                                                    {
                                                                                                        action.description
                                                                                                    }
                                                                                                </span>
                                                                                            </CardBody>
                                                                                            <CardFooter>
                                                                                                O
                                                                                                prazo
                                                                                                limite
                                                                                                para
                                                                                                executar
                                                                                                se
                                                                                                encerra
                                                                                                em:{" "}
                                                                                                <strong>
                                                                                                    {moment(
                                                                                                        action.doneIn
                                                                                                    ).format(
                                                                                                        "DD/MM/YYYY"
                                                                                                    )}
                                                                                                </strong>
                                                                                            </CardFooter>
                                                                                        </Card>
                                                                                    )
                                                                                )}
                                                                        </Container>
                                                                    </CardBody>
                                                                </Card>
                                                            )
                                                        )}
                                                </Container>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            ))) || (
                            <>
                                <span className="display-6">
                                    Não foi encontrado nenhum sonho, por favor,
                                    adicione um novo sonho.
                                </span>
                            </>
                        )}
                    </Container>
                </CardBody>
            </Card>
            <Modals
                show={show}
                onHide={() => setShow(false)}
                options={inputs}
                name={nameModal}
                id={id}
                type={type}
                idUpdate={idUpdate}
            />
        </Container>
    )
}

export default Dreams
