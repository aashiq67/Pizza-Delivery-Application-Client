import { Typography } from "@mui/material";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from './Forgotpassword'

const Enter = () => {
    const [flag, setFlag] = useState(false);
    const [fp, setFp] = useState(false);

    return (
        <center>
            <div className="enter">
            <h1 style={{margin: '3% 0', padding: '0 3%'}}><span className="pizza" style={{color: "black"}}>Pizza</span><span className="hub">Hub</span></h1>
                <Typography variant="h5">For Customer</Typography>
                <p>Here, Customers can order or can make their own pizzas.</p>
                <div className="forms">
                    <div className="btns">
                        <button
                            className="forms-btn"
                            onClick={() => {setFlag(true); setFp(false);}}
                            style={!flag ? { backgroundColor: 'rgb(233, 233, 233, 0.5)', fontSize: '20px' } : { boxShadow: '5px 5px 10px 0px rgba(35, 35, 35, 0.6)' }}
                        >
                            Signup</button>
                        <button
                            className="forms-btn"
                            onClick={() => {setFlag(false); setFp(false);}}
                            style={flag ? { backgroundColor: 'rgb(233, 233, 233, 0.5)' , fontSize: '20px'} : { boxShadow: '-5px 5px 10px 0px rgba(35, 35, 35, 0.6)' }}
                        >
                            Login</button>
                    </div>
                    <div className="form">
                        {!fp && !flag && <Login setFp={setFp} />}
                        {!fp && flag && <Signup />}
                        {fp && <ForgotPassword />}
                    </div>
                </div>
            </div>
        </center>
    );
}

export default Enter;