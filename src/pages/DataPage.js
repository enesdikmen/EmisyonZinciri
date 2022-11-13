import React, { useState, useEffect } from 'react'

import { Stack, Row, Col } from 'react-bootstrap'
import contract from '../contract'
import MyDataCard from '../components/MyDataCard';
import AllDataTableCard from '../components/AllDataTableCard';


const DataPage = ({ setProcessingState, emissionHistory, signer }) => {
    const [allEmissions, setAllEmissions] = useState([])

    var myContract = contract();

    useEffect(() => {

        const getUserEmissionHistory = async () => {

            myContract = myContract.connect(signer)

            let allEmissionsFilter = myContract.filters.EmissionUpdated()
            let allData = await myContract.queryFilter(allEmissionsFilter, -2000, "latest")
            console.log("data page res: ", allData);

            if (!allData[0]) {//veri yok


            } else {//veri var

                let temp = []
                let day = 13
                temp.push({
                    "emissionPointId": allData[allData.length - 1].args.emissionPointId.toString(),
                    "emissionAmount": allData[allData.length - 1].args.emission.toString(),
                    "tracker": allData[allData.length - 1].args.tracker.toString(),
                    
                    "date": day + ".11.2022"

                })
                for (let i = allData.length - 2; i >= 0; i--) {


                    let toPush = {
                        "emissionPointId": allData[i].args.emissionPointId.toString(),
                        "emissionAmount": allData[i].args.emission.toString(),
                        "tracker": allData[i].args.tracker.toString(),

                        "date": ((e) => {
                            if (allData[i].blockNumber == allData[i + 1]?.blockNumber) {
                                return day.toString() + ".11.2022"
                            } else {
                                day = day - 1;
                                return day.toString() + ".11.2022"
                            }

                        })()


                    }

                    temp.push(toPush)

                }
                setAllEmissions(temp)

                console.log("rtemp: ", temp);

                console.log("all data get blo", await allData[0].getBlock());


            }


            // res = res[0].args

            // console.log("filter res: ", res.tracker.toString());
            // console.log("filter res: ", res.emissionPointId.toString());
            // console.log("filter res: ", res.emission.toNumber());


        }

        getUserEmissionHistory();

    }, []);


    return (
        <div>
            <div className="w-100 vh-100 banner-image-data " >

                <div className='' style={{ height: '150px' }}></div>

                <Row className='justify-content-center'>
                    <Col xs lg='10'>
                        
                        <p className='text-start fs-4 reg-text mt-5 mb-1'>Genel emisyon kayıtları</p>
                        <AllDataTableCard allData={allEmissions}></AllDataTableCard>

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