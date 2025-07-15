import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Add more routes here for Trips, etc. */}
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
