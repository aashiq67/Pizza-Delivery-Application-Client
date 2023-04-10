//REACT MODULES
import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// MODULE COMPONENTS
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userLoginAuth, adminLoginAuth } from './store';

// COMPONENTS
import UserHeader from './components/User/Header';
import UserEnter from './components/User/UserEnter';
import UserWelcome from './components/User/Welcome';
import UserForgotPassword from './components/User/Forgotpassword';

import AdminHeader from './components/Admin/Header';
import AdminEnter from './components/Admin/AdminEnter'
import AdminWelcome from './components/Admin/Welcome';
import AdminForgotPassword from './components/Admin/Forgotpassword';

import Home from './components/Home';

function App() {
    // REDUX
    const isLoggedInUser = useSelector(state=>state.isLoggedInUserReducer.isLoggedIn);
    const isLoggedInAdmin = useSelector(state=>state.isLoggedInAdminReducer.isLoggedIn);
    const dispatch = useDispatch();

    // FUNCTIONS
    const verifyUserLogin = async () => {
        const res = await axios.get("http://localhost:5000/user/dashboard", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const verifyAdminLogin = async () => {
        const res = await axios.get("http://localhost:5000/admin/dashboard", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    // USE EFFECTS
    useEffect(()=>{
        verifyUserLogin().then(()=>dispatch(userLoginAuth.login())).catch(err=>console.log(err))
        verifyAdminLogin().then(()=>dispatch(adminLoginAuth.login())).catch(err=>console.log(err))
    }, [])
    
    return (
        <React.Fragment>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* USER ROUTES */}
                    {!isLoggedInUser && <Route path='/user/auth' element={<UserEnter />} />}
                    {isLoggedInUser && <Route path="/user/dashboard" element={<UserWelcome />} />}{" "}

                    {/* ADMIN ROUTES */}
                    <Route path='/admin/auth' element={<AdminEnter />} />
                    {isLoggedInAdmin && <Route path="/admin/dashboard" element={<Fragment><AdminHeader /><AdminWelcome /></Fragment>} />}{" "}
                </Routes>
            </main>
        </React.Fragment>
    );
}

export default App;
