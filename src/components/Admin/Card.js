import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import axios from "axios";

const Card = (props) => {

    const [editHover, setEditHover] = useState(false);
    const [closeHover, setCloseHover] = useState(false);
    const [edit, setEdit] = useState(false);

    const [inputs, setInputs] = useState({
        name: props.name,
        price: props.price,
        img: props.img,
        veg: props.veg
    });
    const borderColor = (inputs.veg) ? 'lightgreen' : 'red'

    const handleChange = (e) => {
        console.log(e.target.name);
        if (e.target.name === "img") {
            setInputs(prev => ({
                ...prev,
                [e.target.name]: e.target.files[0]
            }))
            return;
        }
        else if (e.target.name === "veg") {

            setInputs(prev => ({
                ...prev,
                [e.target.name]: !inputs.veg
            }))
            return;
        }
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    // console.log(inputs);
    const deletePizza = async () => {
        const reply = prompt('Type "yes" for the confirmation');
        if (reply === "yes") {
            const res = await axios.post("http://localhost:5000/pizza/deletepizza", {
                id: props.id
            }).catch(err => console.log(err))
            const data = await res.data;
            props.setPizzas((prevPizzas) => prevPizzas.filter((pizza) => pizza.id !== props.id))
            return data;
        }
    }

    const editPizza = () => {
        setEdit(!edit);
    }

    const sendUpdateReq = async (formdata) => {
        const res = await axios.post("http://localhost:5000/pizza/updatePizza", formdata)
            .catch(err => console.log(err))
        const data = await res.data;
        setInputs(prev => ({
            ...prev,
            ["img"]: data.img
        }))
        return data;
    }

    const saveChanges = async () => {
        //update frontend pizzas
        props.setPizzas(
            props.pizzas.map(pizza =>
                pizza.id === props.id ?
                    {
                        ...pizza,
                        "name": inputs.name,
                        "price": inputs.price,
                        "img": inputs.img,
                        "veg": inputs.veg
                    } : pizza
            )
        )
        //update backend pizzas
        const formdata = new FormData();
        formdata.append("id", props.id);
        formdata.append("name", inputs.name);
        formdata.append("price", inputs.price);
        formdata.append("img", inputs.img)
        formdata.append("veg", inputs.veg);
        sendUpdateReq(formdata).then(() => console.log("pizza updated successfully"))
        setEdit(!edit)
    }

    const ref = useRef(null);
    const [width, setWidth] = useState(180);
    const [fs, setFs] = useState('large');
    useLayoutEffect(()=>{
        const fun = ()=>{
            setWidth(ref.current.offsetWidth);
            console.log(ref.current.offsetWidth);
        }
        window.addEventListener('resize', fun);
    }, [])
    useEffect(()=>{
        if(width<=168){
            setFs('medium')
        } else {
            setFs('large')
        }
    }, [width])

    return (
        <div className="admin-grid-card">
            <div className="admincard" ref={ref} style={{ border: `3px solid ${borderColor}`, boxShadow: `inset 2px 2px 5px 0px ${borderColor}, inset -2px -2px 5px 0px ${borderColor}, 0 4px 30px rgba(35, 35, 35, 0.4)` }}>

                <div className="img-div"><img src={`http://localhost:5000/pizza/getimage/${inputs.img}`} style={edit ? { opacity: 0.5, width: '85%', height: '85%' } : { width: '100%', height: '100%' }} /></div>

                {!edit && <h6 style={{fontSize: `${width/10}px`}}>{inputs.name}</h6>}
                {edit && <TextField
                    name='name'
                    onChange={handleChange}
                    type={'text'}
                    value={inputs.name}
                    placeholder='Pizza Name'
                    margin='none'
                    size="small"
                    variant="standard"
                    sx={{ padding: '0px' }}
                />}

                {!edit && <h6 style={{fontSize: `${width/10}px`}}>{inputs.price}/-</h6>}
                {edit && <TextField
                    name='price'
                    onChange={handleChange}
                    type={'number'}
                    value={inputs.price}
                    placeholder='Price'
                    margin='none'
                    size="small"
                    variant="standard"
                    sx={{ padding: '0px' }}
                />}
                {edit && <RadioGroup
                    row
                    name="veg"
                    value={inputs.veg}
                    onChange={handleChange}
                >
                    <FormControlLabel control={<Radio checked={inputs.veg} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />} label={<span style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>Veg</span>} />
                    <FormControlLabel control={<Radio checked={!inputs.veg} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />} label={<span style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>Non Veg</span>} />
                </RadioGroup>}

                {edit && <label for="upload-img" className="update-img">
                    <CameraAltIcon fontSize="large" sx={{ color: 'gray', opacity: 0.7, transform: 'scale(1.5)' }} />
                    <br />Upload Image
                    <input name="img" id="upload-img" type={"file"} onChange={handleChange} />
                </label>}

                <div className="admincard-icons">
                    <span
                        onMouseOver={() => setEditHover(true)}
                        onMouseOut={() => setEditHover(false)}
                        onClick={editPizza}
                        style={editHover ? {cursor: 'pointer'}:{}}
                    >
                        {!edit && !editHover && <EditOutlinedIcon fontSize={fs} />}
                        {(edit || (!edit && editHover)) && <EditIcon fontSize={fs} />}
                    </span>
                    {edit && <Button variant="contained" size="small" onClick={saveChanges} sx={{p:0}}>save</Button>}
                    <span
                        onMouseOver={() => setCloseHover(true)}
                        onMouseOut={() => setCloseHover(false)}
                        onClick={deletePizza}
                        style={closeHover ? {cursor: 'pointer'}:{}}
                    >
                        {!closeHover && <DeleteOutlineIcon fontSize={fs} />}
                        {closeHover && <DeleteIcon fontSize={fs} />}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;