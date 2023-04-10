import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Welcome from './User/Welcome'
import { useSelector } from 'react-redux';

const Home = () => {
    const isLoggedInUser = useSelector(state=>state.isLoggedInUserReducer.isLoggedIn);
    if(isLoggedInUser) return <Welcome />
    return (
        <div id="box">
            <div id="bg-img">
                <img src="https://c.ndtvimg.com/2021-01/78btgdc_pizza_625x300_15_January_21.jpg"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div id="content">
                <h1 className="content-h1" style={{ margin: '3% 0', padding: '0 3%' }}><span className="pizza">Pizza</span><span className="hub">Hub</span></h1>
                <Box
                    id="user-admin"
                >
                    <div id="user">
                        <Typography variant="h3">For Customer</Typography>
                        <p style={{ margin: '3% 0%' }}>Here, Customers can order or can make their own pizzas.</p>
                        <Link to="/user/auth"><Button variant="contained">Login as User</Button></Link>
                    </div>
                    <div id="admin">
                        <Typography variant="h3">For Admin</Typography>
                        <p style={{ margin: '3% 0%' }}>Here, Admin will manage the pizza and topins stock.</p>
                        <Link to="/admin/auth"><Button variant="contained">Login as Admin</Button></Link>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Home;