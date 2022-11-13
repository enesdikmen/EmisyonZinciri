import React, { useState } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'
import contract  from '../contract'

const CheckerInsertCard = ({ setProcessingState, signer, notifier, blockNum, checkEmissionPoint, setCheckEmissionPoint }) => {

    const [emissionPointID, setEmissionPointID] = useState("")
    const [emissionAmount, setEmissionAmount] = useState("")

    var myContract = contract();
    myContract = myContract.connect(signer)
    const handleNotify = async () =>{
        const res = await myContract.checkEmission(notifier, blockNum, 20)
        setCheckEmissionPoint(null)

        await res.wait()
    }

    return (
        <Card className='w-100 reg-card'>

            <Card.Body>

                <Form>
                    <Row >

                        <Col xs lg='4'>

                            <Row>
                                <Form.Label className='text-end' column lg={6}>
                                    Emisyon Noktası ID
                                </Form.Label>
                                <Col lg={6}>
                                    <InputGroup className="">
                                        <Form.Control
                                            type='text'
                                            value={checkEmissionPoint}
                                            className='text-end'
                                            placeholder=""
                                            disabled
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs lg='6'>
                            <Row>
                                <Form.Label className='text-end' column lg={5}>
                                    Emisyon Miktarı
                                </Form.Label>
                                <Col lg={7}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type='text'

                                            value={emissionAmount}
                                            onInput={e => setEmissionAmount(e.target.value)}
                                            className='text-end'
                                            placeholder=""
                                        />
                                        {/* <InputGroup.Text>x</InputGroup.Text> */}
                                    </InputGroup>
                                </Col>
                            </Row>

                        </Col>



                        <Col xs lg='2'>
                            <Row className='justify-content-end'>
                                <Col lg='6'>
                                    <Button onClick={() => { handleNotify(); }} className='button-ok'>Tamam</Button>

                                </Col>
                            </Row>

                        </Col>

                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CheckerInsertCard