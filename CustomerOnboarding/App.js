import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Addcustomer from './Addcustomer';
import Searchcustomer from './Searchcustomer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="customer-save" element={<Addcustomer />} />
          <Route path="customer-search" element={<Searchcustomer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
