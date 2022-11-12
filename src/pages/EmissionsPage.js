import React from 'react'
import EmissionInsertCard from '../components/EmissionInsertCard';

import { Stack, Row, Col } from 'react-bootstrap'

const EmissionsPage = ({ setProcessingState }) => {
    return (
        <div>
            <div className="w-100 vh-100 banner-image-emissions " >

                <div className='' style={{ height: '150px' }}></div>

                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                        <Stack gap={5}>
                            <EmissionInsertCard setProcessingState={setProcessingState}></EmissionInsertCard>
                        </Stack>
                    </Col>
                </Row>
            </div>
            <div className="w-100 vh-100 banner-image-emissions-dark " >

                <div className='' style={{ height: '150px' }}></div>

                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                        <Stack gap={5}>
                            <EmissionInsertCard setProcessingState={setProcessingState}></EmissionInsertCard>
                        </Stack>
                    </Col>
                </Row>
            </div>
        </div>


    )
}

export default EmissionsPage