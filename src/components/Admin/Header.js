//REACT MODULES
import React, { useState } from 'react';

// MODULE COMPONENTS
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginAuth, adminFirstRenderAuth } from '../../store';
import axios from 'axios';

// COMPONENTS
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';

// INITIAL SETUPS
axios.defaults.withCredentials = true;

const Header = () => {

    // REDUX
    const dispatch = useDispatch();
    const isLoggedInAdmin = useSelector(state => state.isLoggedInAdminReducer.isLoggedIn);

    // USE STATE
    const [value, setValue] = useState();

    // FUNCTIONS
    const sendLogoutReq = async () => {
        const response = await axios.post("http://localhost:5000/admin/logout", null, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response;
        }
        return new Error("Unable to logout. Please try again")
    }

    const handleLogout = () => {
        sendLogoutReq().then(() => dispatch(adminLoginAuth.logout())).then(() => dispatch(adminFirstRenderAuth.setTrue()))
    }

    // RETURN
    return (
        <div>
            <AppBar position='sticky'>
                <Toolbar>
                <h1 className="content-h1" style={{margin: '1% 0', padding: '0 3%'}}><span className="pizza">Pizza</span><span className="hub">Hub</span></h1>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs indicatorColor='secondary'
                            onChange={(e, val) => setValue(val)}
                            value={0}
                            textColor='inherit'
                        >
                            {!isLoggedInAdmin && <><Tab to="/admin/login" LinkComponent={Link} label="Login" />
                            <Tab to="/admin/signup" LinkComponent={Link} label="Signup" /></>}
                            {isLoggedInAdmin && <Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Logout" />}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;