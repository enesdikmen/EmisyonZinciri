import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import EmissionsPage from './pages/EmissionsPage';
import React, { useState } from 'react'
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

  return (
    <div style={{ height: '2600px' }} className='mainback'>

    <Router >
      <Header />


      <Routes >

      <Route path="" element={<MainPage />} />
      <Route path="emissions" element={<EmissionsPage setProcessingState={setProcessingState} />} />


      </Routes>

    </Router>
    {processingState.show &&
      <ProcessingTab processingState={processingState}></ProcessingTab>
      }
    
  </div>
  );
}

export default App;
