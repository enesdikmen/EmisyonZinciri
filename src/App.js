import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import DataPage from './pages/DataPage';
import EmissionsPage from './pages/EmissionsPage';
import React, { useState, useEffect } from 'react'
import ProcessingTab from './components/ProcessingTab';
import contract from './contract'


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
  const [signerAddress, setSignerAddress] = useState(null)
  const [notifier, setNotifier] = useState(null)
  const [blockNum, setBlockNum] = useState(null)

  const [checkEmissionPoint, setCheckEmissionPoint] = useState("")
  const [conrolNotification, setControlNotification] = useState()

  var myContract = contract();

  useEffect(() => {

    const getUserEmissionHistory = async () => {

      if (signerAddress == null) return;
      myContract = myContract.connect(signer)


      let userEmissionsFilter = myContract.filters.EmissionUpdated(signerAddress)
      let userEmissions = await myContract.queryFilter(userEmissionsFilter, -2000, "latest")
      console.log("user emissions: ", userEmissions);

      let temp = []
      console.log("i:", userEmissions[0], "len", userEmissions.length);

      for (let i = 0; i < userEmissions.length; i++) {
        temp.push({
          "emissionPointId":userEmissions[i].args.emissionPointId.toString(),
          "emissionAmount":  userEmissions[i].args.emission.toString(),
          // "date":  userEmissions[i].args.emission.toString(),

        })

        // temp.push(userEmissions[i].);

      }
      setEmissionHistory(temp)

      console.log("temp: ", temp);


      // console.log("filter res: ", res.tracker.toString());
      // console.log("filter res: ", res.emissionPointId.toString());
      // console.log("filter res: ", res.emission.toNumber());

      let notificationsFilter = myContract.filters.CheckerDesignated(null, null, signerAddress)
      let resNotif = await myContract.queryFilter(notificationsFilter, -2000, "latest")
      console.log("login kontrol ataması sonuç: ", resNotif);
      if (!resNotif[resNotif.length - 1]) {//notification yok
        setBlockNum(null)
        setNotifier(null)
        setCheckEmissionPoint(null)
      } else {//notification var

        var blockNumber = resNotif[resNotif.length - 1].args.timestamp.toString()
        console.log("0", resNotif[0].args.timestamp.toString())
        console.log("last", resNotif[resNotif.length - 1].args.timestamp.toString())


        // var blockNumber = resNotif[0].blockNumber.toString()

        var notifier = resNotif[resNotif.length - 1].args.notifier.toString()
        setBlockNum(blockNumber)
        setNotifier(notifier)


        let resSusp = await myContract.suspiciousEmissions(notifier, blockNumber)
        setCheckEmissionPoint(resSusp.emissionPointId.toString())

        console.log("notifitacion values: ", blockNumber, notifier, resSusp.emissionPointId.toString());


      }

      // let blockNumber = resNotif?.[0].args[]




    }

    getUserEmissionHistory();

  }, [signerAddress]);


  return (
    <div >

      <Router >
        <Header setSigner={setSigner} setProvider={setProvider} setSignerAddress={setSignerAddress} />


        <Routes >

          <Route path="" element={<MainPage />} />
          <Route path="emissions" element={<EmissionsPage setProcessingState={setProcessingState} emissionHistory={emissionHistory} signer={signer} notifier={notifier} blockNum={blockNum} checkEmissionPoint={checkEmissionPoint}  setCheckEmissionPoint={setCheckEmissionPoint}/>} />
          <Route path="data" element={<DataPage setProcessingState={setProcessingState} emissionHistory={emissionHistory} signer={signer} />} />


        </Routes>

      </Router>
      {processingState.show &&
        <ProcessingTab processingState={processingState}></ProcessingTab>
      }

    </div>
  );
}

export default App;
