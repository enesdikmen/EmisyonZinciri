import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'

const EmissionHistoryCard = ({ setProcessingState, dailyEmission}) => {



    

    return (
        <Card className='w-100 reg-card'>
            <Card.Body className='p-1'>
                <Card.Title>
                    Geçmiş Emisyon Kayıtlarım
                </Card.Title>
                <Form>
                    <Row >

                        <Col xs lg='3'>

                        </Col>
                        <Col xs lg='3'>
                           

                        </Col>



                        <Col xs lg='3'>
                           

                        </Col>

                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default EmissionHistoryCard