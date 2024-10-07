
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    </Router>
  );
}

export default App;
