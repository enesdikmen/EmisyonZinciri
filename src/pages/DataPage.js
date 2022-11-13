import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'
import contract from '../contract'
import MyDataCard from '../components/MyDataCard';

const DataPage = ({ setProcessingState, emissionHistory, signer }) => {
    const [allEmissions, setAllEmissions] = useState([])

    var myContract = contract();

    useEffect(() => {

        const getUserEmissionHistory = async () => {

            myContract = myContract.connect(signer)

            let allEmissionsFilter = myContract.filters.EmissionUpdated()
            let res = await myContract.queryFilter(allEmissionsFilter, -2000, "latest")
            console.log("data page res: ", res);

            if(!res[0]){//veri yok


            }else{//veri var

            console.log("all data get blo",await res[0].getBlock());


            }
            

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
                        <MyDataCard emissionHistory={emissionHistory}></MyDataCard>

                        <p className='text-start fs-4 reg-text mt-5 mb-1'>Ülke Geneli Emisyonlar</p>
                        <MyDataCard emissionHistory={emissionHistory}></MyDataCard>

                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default DataPage