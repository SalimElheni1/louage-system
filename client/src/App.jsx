import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import DeclareTrip from './pages/DeclareTrip';
import MyTrips from './pages/MyTrips';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './features/auth/authSlice';
import { ThemeContext } from './context/ThemeContext';

function App() {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
    return (
        <BrowserRouter>
            <Header />
            <ToastContainer position="top-center" autoClose={2000} theme={theme} />
            <main className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Protected Routes (Driver Only) */}
                    {/* <Route
                        path="/declare-trip"
                        element={
                            <PrivateRoute allowedRoles={['driver']}>
                                <DeclareTrip />
                            </PrivateRoute>
                        }
                    /> */}
                    <Route
                        path="/my-trips"
                        element={
                            <PrivateRoute allowedRoles={['driver']}>
                                <MyTrips />
                            </PrivateRoute>
                        }
                    />

                    {/* Catch-all route for 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
