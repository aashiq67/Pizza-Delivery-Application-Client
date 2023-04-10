// REACT MODULES
import React, { useEffect, useState } from 'react';


// MODULE COMPONENTS
import { userFirstRenderAuth } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// COMPONENTS
import UserDashboard from './UserDashboard'

// INITIAL SETUPS
axios.defaults.withCredentials = true;

const Welcome = () => {

    // REDUX
    const firstRenderUser = useSelector(state=>state.firstRenderUserReducer.firstRender);
    console.log("Initially firstrender is", firstRenderUser);
    const dispatch = useDispatch();

    // USE STATE
    const [user, setUser] = useState();

    // FUNCTIONS
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/user/refresh", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/user/dashboard", {
            withCredentials: true
        }).catch(err => console.log(err));
        console.log(res);
        const data = await res.data;
        return data;
    }

    // USE EFFECTS
    useEffect(() => {
        if (firstRenderUser) {
            dispatch(userFirstRenderAuth.setFalse());
            sendRequest().then((data) => setUser(data.user));
        }
        let interval = setInterval(() => {
            refreshToken().then((data) => setUser(data.user))
        }, 1000 * 29);
        return () => clearInterval(interval);
    }, []);

    const cfr = useSelector(state=>state.firstRenderUserReducer.firstRender);
    console.log("first render set to", cfr);
    
    // RETURN
    return (
        <div>
            {user && <h1>
                <UserDashboard user={user}/>
            </h1>}
        </div>
    );
}

export default Welcome;