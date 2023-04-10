//REACT MODULES
import React, { useState, useEffect } from 'react';

// MODULE COMPONENTS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
    // REACT-ROUTER-DOM
    const history = useNavigate();
    const [color, setColor] = useState('primary');
    useEffect(()=>{
        setColor('primary');
    }, [])

    // USE STATE
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        conPassword: ""
    });

    // FUNCTIONS
    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/user/signup", {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) => {
        sendRequest().then(alert("Email Sent. verify your account to login")).then(()=>history("/user/auth"))
    }

    useEffect(()=>{
        console.log(inputs.password, inputs.conPassword);
        if(inputs.password!==inputs.conPassword){
            setColor('error');
        } else {
            setColor('primary')
        }
    }, [inputs.password, inputs.conPassword]);

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
                        name='name'
                        onChange={handleChange}
                        value={inputs.name}
                        variant='outlined'
                        placeholder='Name'
                        margin='normal'
                    />
                    <TextField
                        name='email'
                        onChange={handleChange}
                        type={'email'}
                        value={inputs.email}
                        variant='outlined'
                        placeholder='Email'
                        margin='normal'
                    />
                    <TextField
                        name='password'
                        onChange={handleChange}
                        type={'password'}
                        value={inputs.password}
                        variant='outlined'
                        placeholder='Password'
                        margin='normal'
                    />
                    <TextField
                        name='conPassword'
                        onChange={handleChange}
                        type={'password'}
                        value={inputs.conPassword}
                        variant='outlined'
                        placeholder='Confirm Password'
                        margin='normal'
                        color={`${color}`}
                    />
                    <Button variant="contained" type="submit" sx={{m:2}} >Signup</Button>
                </Box>
            </form>
        </div>
    );
}

export default Signup;