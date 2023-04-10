// REACT MODULES
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

// MODULE COMPONENTS
import Card from "./Card";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// COMPONENTS
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, FormLabel, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';

axios.withCredentials = true;


const AdminDashboard = () => {
    // USE STATE
    const [inputs, setInputs] = useState({
        name: String,
        price: Number,
        img: String,
        veg: Boolean
    });
    const [topins, setTopins] = useState({
        sauce: {
            name: "",
            price: ""
        },
        cheese: {
            name: "",
            price: ""
        },
        veggies: {
            name: "",
            price: ""
        }
    })
    const [sauce, setSauce] = useState([{
        name: "",
        price: ""
    }])
    const [cheese, setCheese] = useState([{
        name: "",
        price: ""
    }])
    const [veggies, setVeggies] = useState([{
        name: "",
        price: ""
    }])

    const [b1, setB1] = useState(true);
    const [b2, setB2] = useState(true);
    const [b3, setB3] = useState(true);


    // FUNCTIONS
    const handleChange = (e) => {

        if (e.target.name === "img") {
            setInputs(prev => ({
                ...prev,
                [e.target.name]: e.target.files[0]
            }))
            return;
        }
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleTopinsChange = (e) => {
        let obj = {
            name: "",
            price: ""
        };
        if (e.target.type === "text") {
            obj.name = e.target.value;
            obj.price = topins[`${e.target.name}`].price;
        } else {
            obj.name = topins[`${e.target.name}`].name;
            obj.price = e.target.value;
        }

        setTopins(prevTopins => ({
            ...prevTopins,
            [e.target.name]: obj
        }))
    }

    // FETCH TOPINS
    const fetchTopins = async () => {
        const res = await axios.get("http://localhost:5000/topins/gettopins", {
            withCredentials: true
        }).catch(err => console.log(err))
        const data = await res.data.data[0];
        data.sauce.forEach(s => setSauce(prev => [...prev, { name: s.name, price: s.price }]))
        data.cheese.forEach(s => setCheese(prev => [...prev, { name: s.name, price: s.price }]))
        data.veggies.forEach(s => setVeggies(prev => [...prev, { name: s.name, price: s.price }]))
        return data;
    }

    useEffect(() => {
        (async () => {
            fetchTopins().then(() => { console.log("fetched topins successfully") })
        })();
    }, [])

    const sendAddPizzaReq = async (formdata) => {
        const res = await axios.post("http://localhost:5000/pizza/addnewpizza", formdata)
            .catch(err => console.log(err));
        const data = await res.data;
        setPizzas(prevPizzas => [...prevPizzas, data.id])
        return data;
    }

    const sendAddTopinsReq = async (name) => {
        let value = topins[`${name}`].name;
        let price = topins[`${name}`].price;

        const res = await axios.post("http://localhost:5000/topins/addtopins", {
            name, value, price
        })
            .catch(err => console.log(err));
        const data = await res.data;
        if (name === "sauce" && value !== "") setSauce(prev => [...prev, { name: value, price: price }])
        else if (name === "cheese" && value !== "") setCheese(prev => [...prev, { name: value, price: price }])
        else if (name === "veggies" && value !== "") setVeggies(prev => [...prev, { name: value, price: price }])
        return data;
    }

    const sendDeleteTopinsReq = async (name, value, price) => {
        const res = await axios.post("http://localhost:5000/topins/removetopins", {
            name, value, price
        })
            .catch(err => console.log(err));
        const data = await res.data;
        if (name === "sauce") setSauce(prev => prev.filter((p) => p.name !== value))
        else if (name === "cheese") setCheese(prev => prev.filter((p) => p.name !== value))
        else if (name === "veggies") setVeggies(prev => prev.filter((p) => p.name !== value))
        return data;
    }

    const deleteTopins = (e) => {
        console.log(e.currentTarget);
        const name = e.currentTarget.getAttribute('name');
        const value = e.currentTarget.getAttribute('value1');
        const price = e.currentTarget.getAttribute('value2');
        console.log(name, value, price);
        sendDeleteTopinsReq(name, value, price).then(() => console.log("successfully deleted topins"));
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", inputs.name);
        formdata.append("price", inputs.price);
        formdata.append("img", inputs.img)
        formdata.append("veg", inputs.veg);
        sendAddPizzaReq(formdata).then(() => console.log("pizza added successfully"))
    }

    const handleTopinsSubmit = (e) => {
        const name = e.currentTarget.getAttribute('name');

        if (name === "sauce") setB1(true);
        else if (name === "cheese") setB2(true);
        else if (name === "veggies") setB3(true);

        sendAddTopinsReq(name).then(() => console.log("topins added successfully"))
    }

    // FETCH PIZZAS
    const [pizzas, setPizzas] = useState([]);
    const fetchPizzas = async () => {
        const res = await axios.get("http://localhost:5000/pizza/availablepizza", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        (async () => {
            const data = await fetchPizzas();

            data.message.forEach((pizza, index) => {
                const newPizza = {
                    id: pizza._id,
                    name: pizza.name,
                    price: pizza.price,
                    img: pizza.img,
                    veg: pizza.veg
                }
                setPizzas(oldPizzas => [...oldPizzas, newPizza]);
            })

        })();
    }, [])

    return (
        <div className="adminbody">
        
            <div style={{padding: '1%'}}>
                <Box border={'1px solid rgba(130, 202, 250)'}>
                    <Typography fontFamily={'Cabin'} variant={"h3"} padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Pizza Stock</Typography>
                    <Box
                        margin={'auto'}
                        className="admin-cards-box"
                    >
                        {pizzas.map((data) => {

                            return <Card
                                key={data.id}
                                id={data.id}
                                name={data.name}
                                img={data.img}
                                url={`http://localhost:5000/pizza/getimage/${data.img}`}
                                price={data.price}
                                veg={data.veg}
                                pizzas={pizzas} setPizzas={setPizzas}
                            />
                        }
                        )}
                    </Box>
                </Box>
            </div>
            
            <div style={{padding: '2%'}}>
                <div className="form-topins-div" >
                    <Box border={'1px solid rgba(130, 202, 250)'} marginBottom='3%'>
                        <Typography fontFamily={'Cabin'} variant="h3" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Add New Pizza</Typography>
                        <form onSubmit={handleSubmit}>
                            <Box
                                className="add-pizza-form"
                                margin={'auto'}
                                display="flex"
                                flexDirection={"column"}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <TextField
                                    name='name'
                                    onChange={handleChange}
                                    type={'text'}
                                    value={inputs.name}
                                    variant='outlined'
                                    placeholder='Pizza Name'
                                    margin='normal'
                                />
                                <TextField
                                    name='price'
                                    onChange={handleChange}
                                    type={'number'}
                                    value={inputs.price}
                                    variant='outlined'
                                    placeholder='Price'
                                    margin='normal'
                                />
                                <FormLabel id="demo-row-radio-buttons-group-label" >Category</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="veg"
                                    margin='normal'
                                >
                                    <FormControlLabel value={true} onChange={handleChange} control={<Radio size="small" />} label="Veg" />
                                    <FormControlLabel value={false} onChange={handleChange} control={<Radio size="small" />} label="Non veg" />
                                </RadioGroup>
                                <label for="upload-img" className="upload-img" sx={{ margin: '3% 0%' }}>
                                    <CloudUploadIcon />&nbsp;Upload Image
                                    <input id="upload-img" name="img" type={"file"} onChange={handleChange}></input>
                                </label>
                                <Button variant="contained" type="submit" sx={{ margin: '3% 0%' }}>Add</Button>

                            </Box>
                        </form>
                    </Box>

                    <Box border={'1px solid rgba(130, 202, 250)'}>
                        <Typography fontFamily={'Cabin'} variant="h3" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Toppins Stock</Typography>
                        <div className="admin-topins">
                            <div className="c">
                                <h5>Sauce :</h5>
                                {sauce.map((item) => item.name !== "" &&
                                    <Box className="topins-box">
                                        <div style={{ margin: 'auto' }}> {item.name} {item.price}/-</div>
                                        <div>
                                            <IconButton sx={{ padding: 0 }} name="sauce" value1={item.name} value2={item.price} onClick={deleteTopins}>
                                                <DeleteIcon name="sauce" value1={item.name} value2={item.price} />
                                            </IconButton>
                                        </div>
                                    </Box>
                                )}
                                {b1 && <Button sx={{ margin: '5%' }} variant="contained" onClick={() => setB1(false)}>Add</Button>}
                                {!b1 && <Box>
                                    <TextField
                                        name='sauce'
                                        type={'text'}
                                        value={topins.sauce.name}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Name'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '100%' }}
                                    /><br />
                                    <TextField
                                        name='sauce'
                                        type={'number'}
                                        value={topins.sauce.price}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Price'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '75%' }}
                                    />
                                    <IconButton name="sauce" size="small" onClick={handleTopinsSubmit} sx={{ marginTop: '3%' }}>
                                        <AddIcon name="sauce" fontSize="inherit" />
                                    </IconButton>
                                </Box>}
                            </div>

                            <div className="c">
                                <h5>Cheese :</h5>

                                {cheese.map((item) => item.name !== "" &&
                                    <Box className="topins-box">
                                        <div style={{ margin: 'auto' }}> {item.name} {item.price}/-</div>
                                        <div>
                                            <IconButton sx={{ padding: 0 }} name="cheese" value1={item.name} value2={item.price} onClick={deleteTopins}>
                                                <DeleteIcon name="cheese" value1={item.name} value2={item.price} />
                                            </IconButton>

                                        </div>
                                    </Box>
                                )}
                                {b2 && <Button sx={{ margin: '5%' }} variant="contained" onClick={() => setB2(false)}>Add</Button>}
                                {!b2 && <Box>
                                    <TextField
                                        name='cheese'
                                        type={'text'}
                                        value={topins.cheese.name}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Name'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '100%' }}
                                    />
                                    <TextField
                                        name='cheese'
                                        type={'number'}
                                        value={topins.cheese.price}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Price'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '75%' }}
                                    />
                                    <IconButton name="cheese" size="small" onClick={handleTopinsSubmit} sx={{ marginTop: '3%' }}>
                                        <AddIcon name="cheese" fontSize="inherit" />
                                    </IconButton>
                                </Box>}
                            </div>

                            <div className="c">
                                <h5>Veggies :</h5>

                                {veggies.map((item) => item.name !== "" &&
                                    <Box className="topins-box">
                                        <div style={{ margin: 'auto' }}> {item.name} {item.price}/-</div>
                                        <div>
                                            <IconButton sx={{ padding: 0 }} name="veggies" value1={item.name} value2={item.price} onClick={deleteTopins}>
                                                <DeleteIcon name="veggies" value1={item.name} value2={item.price} />
                                            </IconButton>

                                        </div>
                                    </Box>
                                )}
                                {b3 && <Button sx={{ margin: '5%' }} variant="contained" onClick={() => setB3(false)}>Add</Button>}
                                {!b3 && <Box>
                                    <TextField
                                        name='veggies'
                                        type={'text'}
                                        value={topins.veggies.name}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Name'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '100%' }}
                                    />
                                    <TextField
                                        name='veggies'
                                        type={'number'}
                                        value={topins.veggies.price}
                                        onChange={handleTopinsChange}
                                        variant='standard'
                                        placeholder='Price'
                                        margin='none'
                                        size="small"
                                        sx={{ width: '75%' }}
                                    />
                                    <IconButton name="veggies" size="small" onClick={handleTopinsSubmit} sx={{ marginTop: '3%' }}>
                                        <AddIcon name="veggies" fontSize="inherit" />
                                    </IconButton>
                                </Box>}
                            </div>

                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;