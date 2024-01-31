import { AxiosRequestConfig } from "axios"
import { useState } from "react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Form,
    FormControl,
    FormLabel,
    InputGroup,
    Row,
} from "react-bootstrap"
import InputGroupText from "react-bootstrap/esm/InputGroupText"
import { useNavigate } from "react-router-dom"
import api from "../../../utils/api"

export interface Action {
    _id: string | null | undefined
    difficulty: string
    name: string
    description: string
}

export interface Goal {
    _id: string | null | undefined
    difficulty: string
    name: string
    description: string
    actions?: Action[]
}

export interface Dream {
    _id: string | null | undefined
    name: string
    description: string
    goals?: Goal[]
}

export interface AxiosRequestConfigWithAuth extends AxiosRequestConfig {
    headers?: {
        Authorization?: string
    }
}

const CreateDream = () => {
    const [dream, setDream] = useState<Dream>({
        _id: null,
        name: "",
        description: "",
    })
    const [token] = useState(localStorage.getItem("token") || "")
    const navigate = useNavigate()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDream({
            ...dream,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const config: AxiosRequestConfigWithAuth = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }

        await api.post("/dashboard/dreams", dream, config)

        navigate("/dashboard/dreams")
    }

    return (
        <Container className="col-md-6 col-12">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="text-center">
                        <h3 className="fst-italic">Cadastro de novo sonho</h3>
                    </CardHeader>
                    <CardBody>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira o nome do sonho
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>nome</InputGroupText>
                                <FormControl
                                    type="text"
                                    placeholder="Construir casa"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira a descrição do sonho
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>descrição</InputGroupText>
                                <FormControl
                                    as="textarea"
                                    placeholder="Construir a minha própria moradia"
                                    name="description"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button variant="primary" size="lg" type="submit">
                            CADASTRAR
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        </Container>
    )
}

export default CreateDream
