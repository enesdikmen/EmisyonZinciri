import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { test1 } from '../utils'

const MainPage = () => {


    return (
        <div className=''>
            {/* Banner image karar ver */}
            <div className="banner-image-main  " >
                <Row className='justify-content-center'>
                    <Col xs lg='10'>

                        <div className='d-flex align-items-end justify-content-evenly' style={{ height: '500px' }}>
                            <div className='reg-text w-25'>
                                <h2>Emisyon Hakları</h2>
                                <p className='fs-5'>
                                    Farklı noktalardan yapılan sera gazı salınımlarının takibi 2053 sıfır emisyon hedefimiz için çok önemli.
                                    {/* Bu doğrultuda firmalara devlet tarafından emisyon hakları satılması ve bunların takas edilebilmesi planlanıyor.
                                Firmaların sahip olduğu hakların harcalamarının izlenmesi ise takipçilere kalıyor. */}
                                </p>
                            </div>

                            <div className='reg-text w-25'>
                                <h2>Takip Et</h2>
                                <p className='fs-5'>
                                    Takipçiler verilerini sisteme girebilir, diğer takipçilerin verilerini görüntüleyebilir ve şüpheli bulduğu
                                    verileri bildirebilir.
                                    {/* Takipçiler topladıkları verileri sistemem girebilir, diğer takipçilerin verilerini görüntüleyebilir ve şüpheli bulduğu
                                    veriler için bildirimde bulunabilir. Bir şüpheli bildiriminin kontrolu için atandığında kontrol sonuçlarını da bildirebilir. */}
                                </p>

                            </div>
                        </div>

                    </Col>
                </Row>


            </div>

        </div>

    )
}

export default MainPage