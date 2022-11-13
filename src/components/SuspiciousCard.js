import React, { useState } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'
import contract  from '../contract'

const SuspiciousCard = ({ setProcessingState, signer }) => {

    const [emissionPointID, setEmissionPointID] = useState("")
    const [trackerAddress, setTrackerAddress] = useState("")

    var myContract = contract();
    myContract = myContract.connect(signer)
    const handleNotify = async () =>{
        
        
        setProcessingState({ show: true, text: "Emisyon giriliyor", icon: "loading" })
        
        
        let tResponse = await myContract.notifySuspiciousEmission(trackerAddress, emissionPointID)
        await tResponse.wait()
        console.log('notify res:', tResponse);

        setProcessingState({ show: true, text: "Emisyon girildi.", icon: "done" })
        setTimeout(() => {
            setProcessingState({ show: false, text: "Emisyon girildi.", icon: "done"});
        }, 3000);

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
                                            value={emissionPointID}
                                            onInput={e => setEmissionPointID(e.target.value)}
                                            placeholder=""
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs lg='6'>
                            <Row>
                                <Form.Label className='text-end' column lg={5}>
                                    Takipçi Adresi
                                </Form.Label>
                                <Col lg={7}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type='text'

                                            value={trackerAddress}
                                            onInput={e => setTrackerAddress(e.target.value)}
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

export default SuspiciousCard