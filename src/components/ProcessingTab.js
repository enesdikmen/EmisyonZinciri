import React from 'react'
import { Row, Col } from 'react-bootstrap'


const ProcessingTab = ({processingState}) => {
    return (
        <div className='p-1 btn disabled m-2 processing-tab' style={{ position: "fixed", bottom: "0", right: "0", height: "40px", width: "240px" }}>

            <Row>
                <Col xs="9">
                    <span style={{ "fontSize": "16px" }}>{processingState.text}</span>
                </Col>
                <Col xs="2">
                    <div className="dot-windmill mt-2"></div>

                </Col>
                <Col xs="1">
                </Col>

            </Row>

        </div>

  )
}

export default ProcessingTab