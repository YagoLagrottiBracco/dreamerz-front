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
import { useAuthContext } from "../../../context/UserContext"

interface User {
    email: string
    password: string
}

const Register = () => {
    const [user, setUser] = useState<User>({ email: "", password: "" })
    const { register } = useAuthContext()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        register(user)
    }

    return (
        <Container className="col-md-6 col-12">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="text-center">
                        <h3 className="fst-italic">Registro de novo usuário</h3>
                    </CardHeader>
                    <CardBody>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira seu nome completo
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>nome</InputGroupText>
                                <FormControl
                                    type="text"
                                    placeholder="João da Silva"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira um e-mail válido
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>e-mail</InputGroupText>
                                <FormControl
                                    type="email"
                                    placeholder="email@example.com"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira uma senha válida
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>senha</InputGroupText>
                                <FormControl
                                    type="password"
                                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            <small className="form-text">
                                Deverá ter no mínimo 8 caracteres e contar com
                                letras, números e caracteres especiais
                            </small>
                        </Row>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Confirme a senha digitada anteriormente
                            </FormLabel>
                            <InputGroup>
                                <InputGroupText>confirmação</InputGroupText>
                                <FormControl
                                    type="password"
                                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                    name="confirmPassword"
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

export default Register
