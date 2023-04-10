import React, { useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, FormHelperText, Select, Button, Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios'

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

const CustomizePizza = (props) => {
    console.log(props);
    const [sauceDetails, setSauceDetails] = useState({
        name: "",
        price: 0
    });
    const [cheeseDetails, setCheeseDetails] = useState({
        name: "",
        price: 0
    });
    const [veggiesDetails, setVeggiesDetails] = useState({
        name: "",
        price: 0
    });
    const [totalBill, setTotalBill] = useState();

    useEffect(() => {
        setTotalBill(props.pizza.price + 49)
    }, [props.pizza])

    const handleChange = (e) => {
        let name, price;
        if (e.target.name === "sauce") {
            for(let i=0; i<sauce.length; i++){
                if(sauce[i].id === e.target.value){
                    name = sauce[i].name;
                    price = sauce[i].price;
                    break;
                }
            }
            setTotalBill(totalBill - sauceDetails.price + price)
            setSauceDetails({name: name, price: price})
        }
        else if (e.target.name === "cheese") {
            for(let i=0; i<cheese.length; i++){
                if(cheese[i].id === e.target.value){
                    name = cheese[i].name;
                    price = cheese[i].price;
                    break;
                }
            }
            setTotalBill(totalBill - cheeseDetails.price + price)
            setCheeseDetails({name: name, price: price})
        }
        else if (e.target.name === "veggies") {
            for(let i=0; i<veggies.length; i++){
                if(veggies[i].id === e.target.value){
                    name = veggies[i].name;
                    price = veggies[i].price;
                    break;
                }
            }
            setTotalBill(totalBill - veggiesDetails.price + price)
            setVeggiesDetails({name: name, price: price})
        }
    };

    const closeCustomPizza = () => {
        console.log("close");
        props.setPizza(prev => ({
            ...prev,
            ["id"]: ""
        }))
    }

    // FETCH TOPINS
    const [sauce, setSauce] = useState([{
        id:"",
        name: "",
        price: ""
    }])
    const [cheese, setCheese] = useState([{
        id:"",
        name: "",
        price: ""
    }])
    const [veggies, setVeggies] = useState([{
        id:"",
        name: "",
        price: ""
    }])

    const fetchTopins = async () => {
        const res = await axios.get("http://localhost:5000/topins/gettopins", {
            withCredentials: true
        }).catch(err => console.log(err))
        const data = await res.data.data[0];
        console.log("data", data);
        data.sauce.forEach(s => setSauce(prev => [...prev, { id: s._id, name: s.name, price: s.price }]))
        data.cheese.forEach(s => setCheese(prev => [...prev, { id: s._id, name: s.name, price: s.price }]))
        data.veggies.forEach(s => setVeggies(prev => [...prev, { id: s._id, name: s.name, price: s.price }]))
        return data;
    }
   
    useEffect(() => {
        (async () => {
            fetchTopins().then(() => { console.log("fetched topins successfully") })
        })();
    }, [])

    // RAZORPAY
    const KEY_ID = process.env.KEY_ID;
    const KEY_SECRET = "yBNuQppd2naJDMuqUb2kS9Eb";

    const createOrder = async () => {
        const response = await axios.post("http://localhost:5000/user/payment", {
            amount: totalBill
        })
        // .then(resopnse => console.log(response))
        // .catch(err => console.log(err))
        const data = await response.data;
        return data;
    }

    const displayRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Check your internet connection");
            return;
        }

        const data = await createOrder();
        console.log(data);

        var options = {
            "key": KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": `${totalBill}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": data.order_details.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
        };
        var paymentObj = new window.Razorpay(options);
        paymentObj.open();
    }

    useEffect(()=>{
        const val = document.querySelector('.MuiInputBase-root');
        console.log("value", val);
    }, [veggiesDetails.name])
    
    return (
        <div className="custom-pizza-div">
            <center><span onClick={closeCustomPizza}><CancelIcon /></span></center>
            <div className="custom-pizza-box">
                <div className="custom-pizza-topins">
                    <Box className="custom-pizza-details" border={'1px solid rgba(130, 202, 250)'}>
                        <Typography variant="h4" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Pizza Details</Typography>
                        <Box
                            margin={'auto'}
                            className={"custom-pizza-details-box"}
                        >
                            <div className="custom-pizza-img">
                                <img src={props.pizza.img} width={"100%"} height={"150px"} />
                            </div>
                            <div className="custom-pizza-name">
                                <h3>{props.pizza.name}</h3>
                                <h5>Price : {props.pizza.price}/-</h5>
                            </div>
                        </Box>
                    </Box>
                    <Box className="custom-topins" border={'1px solid rgba(130, 202, 250)'}>
                        <Typography variant="h4" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Choose Topins</Typography>
                        <Box
                            margin={'auto'}
                            className={"custom-topins-box"}
                        >
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <FormHelperText sx={{margin: '0 2%'}}>Sauce</FormHelperText>
                                <Select
                                    labelId="sauce"
                                    id="sauce"
                                    name="sauce"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {sauce.map((item) => item.name !== "" &&
                                        <MenuItem value={item.id}>{item.name} <CurrencyRupeeIcon fontSize="" />{item.price}/-</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <FormHelperText sx={{margin: '0 2%'}}>Cheese</FormHelperText>
                                <Select
                                    labelId="cheese"
                                    id="cheese"
                                    name="cheese"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {cheese.map((item) => item.name !== "" &&
                                        <MenuItem value={item.id}>{item.name} <CurrencyRupeeIcon fontSize="" />{item.price}/-</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <FormHelperText sx={{margin: '0 2%'}}>Veggies</FormHelperText>
                                <Select
                                    labelId="veggies"
                                    id="veggies"
                                    name="veggies"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {veggies.map((item) => item.name !== "" &&
                                        <MenuItem value={item.id}>{item.name} <CurrencyRupeeIcon fontSize="" />{item.price}/-</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </div>
                <Box className="custom-pizza-bill" border={'1px solid rgba(130, 202, 250)'}>
                    <Typography variant="h4" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" >Bill</Typography>
                    <Box
                        margin={'auto'}
                        className={"custom-pizza-bill-box"}
                    >
                        <div className="bill-table">
                            <div className="bill-row">
                                <div>{props.pizza.name}</div>
                                <span className="divider"></span>
                                <div>{props.pizza.price}/-</div>
                            </div>
                            {sauceDetails.price ? <div className="bill-row">
                                <div>{sauceDetails.name}</div>
                                <span className="divider"></span>
                                <div>{sauceDetails.price}/-</div>
                            </div> : <div></div>}
                            {cheeseDetails.price ? <div className="bill-row">
                                <div>{cheeseDetails.name}</div>
                                <span className="divider"></span>
                                <div>{cheeseDetails.price}/-</div>
                            </div> : <div></div>}
                            {veggiesDetails.price ? <div className="bill-row">
                                <div>{veggiesDetails.name}</div>
                                <span className="divider"></span>
                                <div>{veggiesDetails.price}/-</div>
                            </div> : <div></div>}
                            <div className="bill-row">
                                <div>Delivery</div>
                                <span className="divider"></span>
                                <div>49/-</div>
                            </div>
                            <div className="bill-row">
                                <div>Total</div>
                                <span className="divider"></span>
                                <div>{totalBill}/-</div>
                            </div>
                        </div>
                        <center><Button variant="contained" onClick={displayRazorpay} >Buy</Button></center>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default CustomizePizza;