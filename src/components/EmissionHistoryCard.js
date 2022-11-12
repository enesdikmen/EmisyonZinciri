import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'

const EmissionHistoryCard = ({ setProcessingState, dailyEmission }) => {





    return (
        <Card className='w-100 reg-card'>
            <Card.Body className='p-1'>
                <Card.Title className='text-start'>
                    
                </Card.Title>
                <Form>

                    <Row>
                        <Col xs lg='3' className='text-start fs-6'>
                        <strong>{dailyEmission[0].date}</strong>
                        </Col>
                        <Col xs lg='3'>
                            <strong>Emisyon Noktası</strong>

                        </Col>
                        <Col xs lg='3'>
                            <strong>Emisyon Miktari</strong>

                        </Col>

                        <Col xs lg='3'>

                        </Col>

                    </Row>
                    {dailyEmission.map((item, i) =>

                        <Row key={i}>
                            <Col xs lg='3'>

                            </Col>
                            <Col xs lg='3'>
                                {item.emissionPointId}

                            </Col>
                            <Col xs lg='3'>
                                {item.emissionAmount}
                            </Col>

                            <Col xs lg='3'>

                            </Col>
                            {i != (dailyEmission.length - 1) &&
                                <hr />

                            }

                        </Row>

                    )}

                </Form>
            </Card.Body>
        </Card>
    )
}

export default EmissionHistoryCard