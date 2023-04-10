//REACT MODULES
import React, { useState } from 'react';

// MODULE COMPONENTS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import { Button, TextField, Typography, Box } from '@mui/material';

const ForgotPassword = () => {
    // REACT-ROUTER-DOM FUNCTIONS
    const history = useNavigate();

    // USE STATE FUNCTIONS
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState();
    const [password, setPassword] = useState("");
    const [fp, setFP] = useState(true);
    const [sp, setSP] = useState(false);

    // FUNCTIONS
    const sendFPemail = async () => {
        const res = await axios.post("http://localhost:5000/user/forgotpassword", {
            email: email
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const verifyOTP = async () => {
        const res = await axios.post("http://localhost:5000/user/verifyotp", {
            OTP: otp
        }).catch(err => console.log(err));
        const data = res.data;
        return data;
    }

    const setNewPassword = async () => {
        const res = await axios.post("http://localhost:5000/user/setpassword", {
            password: password
        }).catch(err => console.log(err));
        const data = res.data;
        return data;
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        sendFPemail().then(alert("OTP Sent. verify your account")).then(() => setFP(false))
    }

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        verifyOTP().then(() => { setFP(false); setSP(true); })
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setNewPassword().then(() => history("/user/auth"))
    }

    // RETURN
    return (
        <div>
            {fp && <form onSubmit={handleEmailSubmit}>
                <Box
                    margin={'auto'}
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h5" fontFamily={'Cabin'}>Enter Email Linked</Typography>
                    <TextField
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        type={'email'}
                        value={email}
                        variant='outlined'
                        placeholder='Email'
                        margin='normal'
                    />
                    <Button variant="contained" type="submit" >Submit</Button>
                </Box>
            </form>}
            {!fp && !sp && <form onSubmit={handleOTPSubmit}>
                <Box
                    margin={'auto'}
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h5" fontFamily={'Cabin'}>Enter OTP</Typography>
                    <TextField
                        name='otp'
                        onChange={(e) => setOtp(e.target.value)}
                        type={'number'}
                        value={otp}
                        variant='outlined'
                        placeholder='OTP'
                        margin='normal'
                    />
                    <Button variant="contained" type="submit" >Submit</Button>
                </Box>
            </form>}
            {sp && <form onSubmit={handlePasswordSubmit}>
                <Box
                    margin={'auto'}
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h5" fontFamily={'Cabin'}>Set Password</Typography>
                    <TextField
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        value={password}
                        variant='outlined'
                        placeholder='Password'
                        margin='normal'
                    />
                    <Button variant="contained" type="submit" >Submit</Button>
                </Box>
            </form>}
        </div>
    );
}

export default ForgotPassword;