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

export interface Options {
    label: string
    title: string
    name: string
    placeholder: string
    type: string
    small: { active: boolean; text: string | null }
    items: { value: string; text: string }[] | null
}

const Forms = ({ options }: { options: Options[] }) => {
    return (
        <Container>
            <Form>
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
                                        as={option.type}
                                        placeholder={option.placeholder}
                                        name={option.name}></FormControl>
                                </InputGroup>
                            ) : option.type === "select" ? (
                                <FormSelect>
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
                                        type={option.type}
                                        placeholder={option.placeholder}
                                        name={option.name}
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
