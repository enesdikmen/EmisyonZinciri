import React, { useState } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'

const EmissionInsertCard = ({ setProcessingState }) => {

    const [sensorID, setSensorID] = useState(0)
    const [emissionAmount, setEmissionAmount] = useState(0)


    const handleEmissionInsert = async () =>{
        await setProcessingState({ show: true, text: "Emisyon giriliyor", icon: "loading" })
        console.log("inserting emission id:", sensorID, "amount: ", emissionAmount);
        // mock wait
        let res = await fetch('https://api.rapidmock.com/mocks/89mEw', {
            method: "GET",
            headers: {
                "x-rapidmock-delay": "2500"
            },
        })
        console.log('emission successfully inserted res:', res);

        setProcessingState({ show: true, text: "Emisyon girildi.", icon: "done" })
        setTimeout(() => {
            setProcessingState({ show: false, text: "Emisyon girildi.", icon: "done"});
        }, 100000);

    }

    return (
        <Card className='w-100 reg-card'>

            <Card.Body>
                <Card.Title>

                    Emisyon Girdisi</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>
                </Card.Text>
                <Form>
                    <Row className='mt-5'>

                        <Col xs lg='3'>

                            <Row>
                                <Form.Label className='text-end' column lg={6}>
                                    ID
                                </Form.Label>
                                <Col lg={6}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            value={sensorID}
                                            onInput={e => setSensorID(e.target.value)}
                                            className='text-end'
                                            placeholder="100"
                                        />
                                        <InputGroup.Text>x</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs lg='3'>
                            <Row>
                                <Form.Label className='text-end' column lg={6}>
                                    Miktar
                                </Form.Label>
                                <Col lg={6}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            value={emissionAmount}
                                            onInput={e => setEmissionAmount(e.target.value)}
                                            className='text-end'
                                            placeholder="100"
                                        />
                                        <InputGroup.Text>x</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>

                        </Col>



                        <Col xs lg='3'>
                            <Row className='justify-content-end'>
                                <Col lg='6'>
                                    <Button onClick={() => { handleEmissionInsert(); }} className='button-ok'>Tamam</Button>

                                </Col>
                            </Row>

                        </Col>

                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EmissionInsertCard