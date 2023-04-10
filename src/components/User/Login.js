//REACT MODULES
import React, { useEffect, useState } from 'react';

// MODULE COMPONENTS
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAuth } from '../../store';
import axios from 'axios';

// COMPONENTS
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = (props)=>{
    // REDUX
    const isLoggedInUser = useSelector(state=>state.isLoggedInUserReducer.isLoggedIn);
    const dispatch = useDispatch();

    // REACT-ROUTER-DOM
    const history = useNavigate();

    // USE STATE
    const [passColor, setPassColor] = useState('primary');
    const [emailColor, setEmailColor] = useState('primary');
    useEffect(()=>{
        setPassColor('primary');
        setEmailColor('primary');
    }, [])
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    // FUNCTIONS
    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = () => {
        setEmailColor('primary');
        setPassColor('primary');
        console.log("SENDING LOGIN REQUEST");
        const res = axios.post("http://localhost:5000/user/login", {
            email: inputs.email,
            password: inputs.password
        }).then(()=>dispatch(userLoginAuth.login()))
        .then(()=>localStorage.setItem('user', inputs.email))
        .then(()=>history("/user/dashboard"))
        .catch(err=>{
            if(err.response.data.message==="Invalid Password."){
                setPassColor('error');
            } else if(err.response.data.message==="Invalid Email."){
                setEmailColor('error');
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
        console.log("REQUEST ACCEPTED ADN LOGGED IN");
    }

    // RETURN
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    margin={'auto'}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"

                >
                    <TextField
                        name='email'
                        onChange={handleChange}
                        type={'email'}
                        value={inputs.email}
                        variant='outlined'
                        placeholder='Email'
                        margin='normal'
                        color={`${emailColor}`}
                    />
                    {emailColor==="error" && <span style={{color:'red'}}>Invalid Email</span>}
                    <TextField
                        name='password'
                        onChange={handleChange}
                        type={'password'}
                        value={inputs.password}
                        variant='outlined'
                        placeholder='Password'
                        margin='normal'
                        color={`${passColor}`}
                    />
                    {passColor==="error" && <span style={{color:'red'}}>Invalid Password</span>}
                    <Link style={{ margin: '1rem 0rem' }} onClick={()=>props.setFp(true)}>forgot password?</Link>
                    <Button variant="contained" type="submit" >Login</Button>
                </Box>
            </form>
        </div>
    );
}

export default Login;