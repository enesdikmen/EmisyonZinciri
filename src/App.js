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

      //start parsing
      let temp = []

      if (userEmissions.length > 0) {
        let day = 13
        temp.push({
          "emissionPointId": userEmissions[userEmissions.length - 1].args.emissionPointId.toString(),
          "emissionAmount": userEmissions[userEmissions.length - 1].args.emission.toString(),

          "date": day + ".11.2022"

        })
        for (let i = userEmissions.length - 2; i >= 0; i--) {


          let toPush = {
            "emissionPointId": userEmissions[i].args.emissionPointId.toString(),
            "emissionAmount": userEmissions[i].args.emission.toString(),

            "date": ((e) => {
              if (userEmissions[i].blockNumber == userEmissions[i + 1]?.blockNumber) {
                return day.toString() + ".11.2022"
              } else {
                day = day - 1;
                return day.toString() + ".11.2022"
              }

            })()


          }

          temp.push(toPush)

        }
        setEmissionHistory(temp)


      }
      //end parsing
      console.log("main temp: ", temp);


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
          <Route path="emissions" element={<EmissionsPage setProcessingState={setProcessingState} emissionHistory={emissionHistory} signer={signer} notifier={notifier} blockNum={blockNum} checkEmissionPoint={checkEmissionPoint} setCheckEmissionPoint={setCheckEmissionPoint} />} />
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
