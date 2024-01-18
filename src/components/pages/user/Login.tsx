import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/UserContext"

interface User {
    email: string
    password: string
}

const Login = () => {
    const [user, setUser] = useState<User>({ email: "", password: "" })
    const { login } = useAuthContext()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        login(user)
    }

    return (
        <Container className="col-md-6 col-12">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="text-center bg-primary bg-opacity-25 bg-gradient">
                        <h1 className="display-1">
                            <FontAwesomeIcon
                                icon={faBullseye}
                                className="text-danger"
                            />
                        </h1>
                        <h1 className="display-1 fw-bolder font-monospace">
                            DreamerZ
                        </h1>
                    </CardHeader>
                    <CardBody>
                        <Row className="my-2">
                            <FormLabel className="h6">
                                Insira seu e-mail
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
                                Insira sua senha
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
                            <small className="form-text mt-4">
                                Se você ainda não tem uma conta,{" "}
                                <Link to="/register">clique aqui</Link> para
                                criar sua conta gratuitamente
                            </small>
                        </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button variant="primary" size="lg" type="submit">
                            LOGIN
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        </Container>
    )
}

export default Login
