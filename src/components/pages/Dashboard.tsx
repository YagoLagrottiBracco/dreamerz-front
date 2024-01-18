import { Component } from "react"
import Chart from "react-apexcharts"
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from "react-bootstrap"

export default class Home extends Component {
    render() {
        const state = {
            options: {
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: [
                        1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                    ],
                },
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91],
                },
            ],
        }

        return (
            <Container className="my-5 py-5">
                <Card>
                    <CardHeader className="text-center">
                        <h3 className="fst-italic">Dashboard</h3>
                    </CardHeader>
                    <CardBody>
                        <Container>
                            <Row className="p-5">
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="bar"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="heatmap"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="line"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="p-5">
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="area"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="radar"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="p-5">
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <Chart
                                                options={state.options}
                                                series={state.series}
                                                type="area"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}
