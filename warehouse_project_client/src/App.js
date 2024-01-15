import React from 'react'
import Sidebar from './Sidebar';
import  './Styles/main.css';
import './Styles/buttons.css';
import RoutesComponent from './Routes';
import { BrowserRouter } from "react-router-dom";



function App() {
  return (
    
    <div role="main" className="container-fluid" id="wrapper">
        <div className="row">
            <BrowserRouter>
              <RoutesComponent/>
              <Sidebar/>
            </BrowserRouter>
        </div>
    </div>
    
  );
}

export default App;
