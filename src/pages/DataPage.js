import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'
import contract from '../contract'

const DataPage = ({ setProcessingState, emissionHistory, signer }) => {
    const [allEmissions, setAllEmissions] = useState([])

    var myContract = contract();

    useEffect(() => {

        const getUserEmissionHistory = async () => {

            myContract = myContract.connect(signer)

            let allEmissionsFilter = myContract.filters.EmissionUpdated()
            let res = await myContract.queryFilter(allEmissionsFilter, -2000, "latest")
            console.log("res: ", res);

            // res = res[0].args

            // console.log("filter res: ", res.tracker.toString());
            // console.log("filter res: ", res.emissionPointId.toString());
            // console.log("filter res: ", res.emission.toNumber());


            // setAllEmissions(result)
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