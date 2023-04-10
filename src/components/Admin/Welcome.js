// REACT MODULES
import React, { useEffect, useState } from 'react';


// MODULE COMPONENTS
import { adminFirstRenderAuth } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// COMPONENTS
import AdminDashboard from './AdminDashboard'

// INITIAL SETUPS
axios.defaults.withCredentials = true;

const Welcome = () => {

    // REDUX
    const firstRender = useSelector(state=>state.firstRenderAdminReducer.firstRender);
    console.log("Initially firstrender is", firstRender);
    const dispatch = useDispatch();

    // USE STATE
    const [admin, setAdmin] = useState();

    // FUNCTIONS
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/admin/refresh", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/admin/dashboard", {
            withCredentials: true
        }).catch(err => console.log(err));
        console.log(res);
        const data = await res.data;
        return data;
    }

    // USE EFFECTS
    useEffect(() => {
        if (firstRender) {
            dispatch(adminFirstRenderAuth.setFalse());
            sendRequest().then((data) => setAdmin(data.admin));
        }
        let interval = setInterval(() => {
            refreshToken().then((data) => setAdmin(data.admin))
        }, 1000 * 29);
        console.log(admin);
        return () => clearInterval(interval);
    }, []);

    const cfr = useSelector(state=>state.firstRenderAdminReducer.firstRender);
    console.log("first render set to", cfr);
    
    // RETURN
    return (
        <div>
            {admin && <h1>
                <AdminDashboard />
            </h1>}
        </div>
    );
}

export default Welcome;