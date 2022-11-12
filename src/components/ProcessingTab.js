import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'


const ProcessingTab = ({ processingState }) => {
    let icon = <span className='fs-4'><strong>&#10003;</strong> </span>
    if (processingState.icon === "loading") {
        icon = <Spinner className='fs-5' animation="border" />
    } else if (processingState.icon === "failed") {
        icon = <>&#10060;</>
    }
    return (


        <div className='p-1 btn disabled m-2 processing-tab align-items-center' style={{ position: "fixed", bottom: "0", right: "0", height: "50px", width: "240px" }}>

            <Row className='align-middle align-items-center'>
                <Col xs="9" >
                    <div style={{ "fontSize": "16px" }} >{processingState.text}</div>
                </Col>
                <Col xs="2" >
                    {icon}

                </Col>
                <Col xs="1">
                    
                </Col>

            </Row>

        </div>

    )
}

export default ProcessingTab