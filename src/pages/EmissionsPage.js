import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'
import EmissionHistoryCard from '../components/EmissionHistoryCard';
import SuspiciousCard from '../components/SuspiciousCard';

const EmissionsPage = ({ setProcessingState, emissionHistory, signer }) => {



    return (
        <div>
            <div className="w-100 vh-100 banner-image-emissions " >

                <div className='' style={{ height: '150px' }}></div>

                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                       
                        <p className='text-start fs-4 reg-text mt-5 mb-1'>Geçmiş Kayıtlarım</p>
                        
                        <SuspiciousCard setProcessingState={ setProcessingState} signer={signer}></SuspiciousCard>

                        <Stack gap={3}>

                            {Object.keys(emissionHistory).map((item, i) =>

                                <EmissionHistoryCard key={i} setProcessingState={setProcessingState} dailyEmission={emissionHistory[item]}></EmissionHistoryCard>

                            )}

                        </Stack>
                    </Col>
                </Row>
            </div>
        </div>
        
    )
}

export default EmissionsPage