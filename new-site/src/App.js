import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element= {<Home />}  />
            </Routes>
        </Router>
    );
};

export default App;
