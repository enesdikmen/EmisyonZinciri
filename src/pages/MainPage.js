import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { test1 } from '../utils'

const MainPage = () => {


    return (
        <div className=''>
            {/* Banner image karar ver */}
            <div className="w-100 vh-100 banner-image-main " >
                <Row className='justify-content-center'>
                    <Col xs lg='10'>

                        <div className='d-flex align-items-end justify-content-evenly' style={{ height: '350px' }}>
                            <div className='reg-text w-25'>
                                <h2>Heading</h2>
                                <p className='fs-5'>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua.
                                </p>
                            </div>

                            <div className='reg-text w-25'>
                                <h2>Heading</h2>
                                <p className='fs-5'>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                    </Col>
                </Row>

            <Row>
                Test buttons:
                <div>
                    <Button onClick={()=> {test1();}}>Test1</Button>
                </div>
            </Row>

            </div>
            <div className="w-100 vh-100 banner-image-main " >
            </div>

        </div>

    )
}

export default MainPage