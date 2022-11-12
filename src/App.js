import './App.css';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div style={{ height: '2600px' }} className='mainback'>

    <Router >
      <Header />


      <Routes >

      <Route path="" element={<MainPage />} />

      </Routes>

    </Router>

    
  </div>
  );
}

export default App;
