import { ChangeEvent, useEffect, useState } from "react"
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormLabel,
    FormSelect,
    InputGroup,
    Row,
} from "react-bootstrap"
import InputGroupText from "react-bootstrap/esm/InputGroupText"
import api from "../utils/api"
import { AxiosRequestConfigWithAuth } from "./pages/dream/CreateDream"

export interface Options {
    label: string
    title: string
    name: string
    placeholder: string
    type: string
    small: { active: boolean; text: string | null }
    items: { value: string; text: string }[] | null
}

const Forms = ({
    options,
    id,
    type,
    idUpdate,
}: {
    options: Options[]
    id: string
    type: string
    idUpdate: string
}) => {
    const [data, setData] = useState<{ [key: string]: string }>({})
    const [token] = useState(localStorage.getItem("token") || "")

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const target = e.target as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
        setData({ ...data, [target.name]: target.value })
    }

    useEffect(() => {
        if (idUpdate) {
            api.get(
                `${
                    import.meta.env.VITE_APP_API_URL
                }/dashboard/${type}/find/${idUpdate}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                }
            ).then((response) => {
                if (type === "goals") {
                    setData(response.data.goal)
                } else {
                    setData(response.data.action)
                }
            })
        }
    }, [idUpdate, token, type])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const config: AxiosRequestConfigWithAuth = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }

        if (!idUpdate) {
            await api.post(
                `${import.meta.env.VITE_APP_API_URL}/dashboard/${type}/${id}`,
                data,
                config
            )
        } else {
            await api.patch(
                `${
                    import.meta.env.VITE_APP_API_URL
                }/dashboard/${type}/${idUpdate}`,
                data,
                config
            )
        }

        window.location.reload()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {options.map((option, index) => (
                    <Row className="my-2" key={index}>
                        <Col>
                            <FormLabel className="h6">{option.label}</FormLabel>
                            {option.type === "textarea" ? (
                                <InputGroup>
                                    <InputGroupText>
                                        {option.title}
                                    </InputGroupText>
                                    <FormControl
                                        required
                                        as={option.type}
                                        placeholder={option.placeholder}
                                        name={option.name}
                                        onChange={handleChange}
                                        value={
                                            data[option.name] || ""
                                        }></FormControl>
                                </InputGroup>
                            ) : option.type === "select" ? (
                                <FormSelect
                                    required
                                    onChange={handleChange}
                                    name={option.name}
                                    value={data[option.name] || ""}>
                                    <option>Selecione...</option>
                                    {option.items!.map((item, index) => (
                                        <option value={item.value} key={index}>
                                            {item.text}
                                        </option>
                                    ))}
                                </FormSelect>
                            ) : (
                                <InputGroup>
                                    <InputGroupText>
                                        {option.title}
                                    </InputGroupText>
                                    <FormControl
                                        required
                                        type={option.type}
                                        placeholder={option.placeholder}
                                        name={option.name}
                                        onChange={handleChange}
                                        value={data[option.name] || ""}
                                    />
                                </InputGroup>
                            )}
                            {option.small.active || (
                                <small className="form-text mt-4">
                                    {option.small.text}
                                </small>
                            )}
                        </Col>
                    </Row>
                ))}
                <div className="text-center">
                    <Button variant="primary" size="lg" type="submit">
                        Salvar
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Forms
