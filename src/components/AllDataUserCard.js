import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { waitFor } from '../utils'

const AllDataUserCard = ({ setProcessingState, allData }) => {



    console.log("data table: ", allData);

    return (
        <Card className='w-100 reg-card mb-3'>
            <Card.Body className='p-1'>
                <Card.Title className='text-start'>

                </Card.Title>
                <Form>

                    <Row>
                    <Col xs lg='3'>
                            <strong>Tarih</strong>

                        </Col>
                       
                        
                        <Col xs lg='2'>
                            <strong>Emisyon Noktası</strong>

                        </Col>

                        <Col xs lg='2'>
                        <strong>Emisyon Miktarı</strong>

                        </Col>

                    </Row>
                    {allData.map((item, i) =>

                        <Row key={i}>
                            <Col xs lg='3'>
                                {item.date}
                            </Col>
                          
                            
                            <Col xs lg='2'>
                                {item.emissionPointId}

                            </Col>
                            <Col xs lg='2'>
                                {item.emissionAmount}
                            </Col>

                            {i != (allData.length - 1) &&
                                <hr />

                            }

                        </Row>

                    )}

                </Form>
            </Card.Body>
        </Card>
    )
}

export default AllDataUserCard