import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'
import EmissionHistoryCard from '../components/EmissionHistoryCard';
import SuspiciousCard from '../components/SuspiciousCard';
import CheckerInsertCard from '../components/CheckerInsertCard';

const EmissionsPage = ({ setProcessingState, emissionHistory, signer, blockNum, notifier, checkEmissionPoint }) => {



    return (
        <div>
            <div className="w-100 vh-100 banner-image-emissions " >

                <div className='' style={{ height: '150px' }}></div>
                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                        {(checkEmissionPoint !=0 && checkEmissionPoint !=null) &&
                            <>
                                <p className='text-start fs-4 reg-text mt-2 mb-2'>Şüpheli Emisyon Kontrol Sonucu</p>
                                <CheckerInsertCard className='mb-5' setProcessingState={setProcessingState} signer={signer} checkEmissionPoint={checkEmissionPoint} blockNum={blockNum} notifier={notifier}></CheckerInsertCard>
                            </>
                        }
                        <p className='text-start fs-4 reg-text mt-2 mb-2'>Şüpheli Emisyon Bildir</p>

                        <SuspiciousCard className='mb-5' setProcessingState={setProcessingState} signer={signer}></SuspiciousCard>

                        <p className='text-start fs-4 reg-text mt-5 mb-1'>Geçmiş Kayıtlarım</p>


                        <Stack gap={3}>

                            {Object.keys(emissionHistory).map((item, i) =>

                                <EmissionHistoryCard key={i} setProcessingState={setProcessingState} dailyEmission={emissionHistory[item]}></EmissionHistoryCard>

                            )}

                        </Stack>
                    </Col>
                </Row>
            </div>
        </div >

    )
}

export default EmissionsPage