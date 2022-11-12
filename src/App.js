import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import DataPage from './pages/DataPage';
import EmissionsPage from './pages/EmissionsPage';
import React, { useState, useEffect } from 'react'
import ProcessingTab from './components/ProcessingTab';


import 'bootstrap/dist/css/bootstrap.min.css';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [processingState, setProcessingState] = useState({ show: false, text: "Processing", icon: "loading" })
  const [emissionHistory, setEmissionHistory] = useState([])
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [signerAdress, setSignerAddress] = useState(null)
  

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

      setEmissionHistory(result)
    }

    getUserEmissionHistory();

  }, []);


  return (
    <div >

      <Router >
        <Header setSigner={setSigner} setProvider={setProvider} setSignerAddress={setSignerAddress}/>


        <Routes >

          <Route path="" element={<MainPage />} />
          <Route path="emissions" element={<EmissionsPage setProcessingState={setProcessingState} emissionHistory={emissionHistory} signer={signer}/>} />
          <Route path="data" element={<DataPage setProcessingState={setProcessingState} emissionHistory={emissionHistory}/>} />


        </Routes>

      </Router>
      {processingState.show &&
        <ProcessingTab processingState={processingState}></ProcessingTab>
      }

    </div>
  );
}

export default App;
