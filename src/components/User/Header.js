//REACT MODULES
import React, { useState } from 'react';

// MODULE COMPONENTS
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAuth, userFirstRenderAuth } from '../../store';
import axios from 'axios';

// COMPONENTS
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';

// INITIAL SETUPS
axios.defaults.withCredentials = true;

const Header = () => {

    // REDUX
    const isLoggedInUser = useSelector(state => state.isLoggedInUserReducer.isLoggedIn);

    // USE STATE

    // RETURN
    return (
        <div>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant="h3">MernAuth</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs indicatorColor='secondary'
                            textColor='inherit'
                        >
                            {!isLoggedInUser && <div><Tab to="/user/login" LinkComponent={Link} label="Login" />
                            <Tab to="/user/signup" LinkComponent={Link} label="Signup" /></div>}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;