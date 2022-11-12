import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'

const DataPage = ({ setProcessingState, emissionHistory }) => {
    const [allEmissions, setAllEmissions] = useState([])


    useEffect(() => {


        const getUserEmissionHistory = async () => {
            // mock wait
            let res = await fetch('https://api.rapidmock.com/mocks/89mEw', {
                method: "GET",
                headers: {
                    "x-rapidmock-delay": "100"
                },
            })

            res = {
                "data": [
                    { 'date': '12.02.2022', 'emissionPointId': "34000123", "emissionAmount": "2.12" },
                    { 'date': '12.02.2022', 'emissionPointId': "34000124", "emissionAmount": "4.22" },
                    { 'date': '12.02.2022', 'emissionPointId': "34000125", "emissionAmount": "0.95" },

                    { 'date': '11.02.2022', 'emissionPointId': "34000123", "emissionAmount": "2.10" },
                    { 'date': '11.02.2022', 'emissionPointId': "34000124", "emissionAmount": "3.91" },
                    { 'date': '11.02.2022', 'emissionPointId': "34000125", "emissionAmount": "1.05" },

                    { 'date': '10.02.2022', 'emissionPointId': "34000123", "emissionAmount": "2.14" },
                    { 'date': '10.02.2022', 'emissionPointId': "34000124", "emissionAmount": "4.66" },
                    { 'date': '10.02.2022', 'emissionPointId': "34000125", "emissionAmount": "1.07" },

                    { 'date': '09.02.2022', 'emissionPointId': "34000123", "emissionAmount": "2.14" },
                    { 'date': '09.02.2022', 'emissionPointId': "34000124", "emissionAmount": "4.66" },
                    { 'date': '09.02.2022', 'emissionPointId': "34000125", "emissionAmount": "1.07" },
                ]

            }

            let emissionData = res['data']
            let result = emissionData.reduce(function (r, a) {
                r[a.date] = r[a.date] || [];
                r[a.date].push(a);
                return r;
            }, Object.create(null));

            console.log("res", result)

            setAllEmissions(result)
        }

        getUserEmissionHistory();

    }, []);


    return (
        <div>
            <div className="w-100 vh-100 banner-image-data " >

                <div className='' style={{ height: '150px' }}></div>

                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                       
                        <p className='text-start fs-4 reg-text mt-5 mb-1'>Günlük Toplam Kayıtlarım</p>

                        <Stack gap={3}>

                                {/* <EmissionHistoryCard setProcessingState={setProcessingState} dailyEmission={emissionHistory[item]}></EmissionHistoryCard> */}


                        </Stack>
                    </Col>
                </Row>
            </div>
        </div>
        
    )
}

export default DataPage