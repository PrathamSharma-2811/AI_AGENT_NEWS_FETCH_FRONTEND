// App.js
import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
        <Routes>

        
        {/* Define the route for the Login component */}
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<Home />} />



          
        </Routes>

    </Router>
  );
}

export default App;
