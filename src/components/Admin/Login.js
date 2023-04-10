//REACT MODULES
import React, { useState, useEffect } from 'react';

// MODULE COMPONENTS
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginAuth } from '../../store';
import axios from 'axios';

// COMPONENTS
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = (props)=>{
    // REDUX
    const isLoggedInAdmin = useSelector(state=>state.isLoggedInAdminReducer.isLoggedIn);
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

    const sendRequest =  () => {
        setEmailColor('primary');
        setPassColor('primary');
        const res =  axios.post("http://localhost:5000/admin/login", {
            email: inputs.email,
            password: inputs.password
        }).then(()=>dispatch(adminLoginAuth.login()))
        .then(()=>history("/admin/dashboard"))
        .catch(err => {
            console.log(err);
            if(err.response.data.message==="Invalid Email."){
                setEmailColor('error');
            } else if(err.response.data.message==="Invalid Password."){
                setPassColor('error');
            }
        });
        return res;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
        console.log("Login auth set to ", isLoggedInAdmin);
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
                        margin='normal'color={`${passColor}`}
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