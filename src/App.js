import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio';


function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Inicio/>}/>
      </Routes>
    </Router>
  );
}

export default App;
