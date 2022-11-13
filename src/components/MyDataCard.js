import React, { useState } from 'react'
import { Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MyDataCard = ({ setProcessingState }) => {

    const [sensorID, setSensorID] = useState(0)
    const [emissionAmount, setEmissionAmount] = useState(0)




    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //     display: true,
            //     text: 'Chart.js Bar Chart',
            // },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1,2,3,4,5,6,7],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
           
        ],
    };




    return (
        <Card className='w-100 reg-card'>

            <Card.Body>
                <Row className='mt-5'>
                <Bar options={options} data={data} />;



                </Row>
            </Card.Body>
        </Card>
    )
}

export default MyDataCard