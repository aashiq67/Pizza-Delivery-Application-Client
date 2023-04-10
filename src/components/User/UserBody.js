import React, { useEffect, useState } from "react";

// MODULE COMPONENTS
import { useSelector } from 'react-redux';
import axios from 'axios';

import Card from "./Card";
import { Box, Button, Typography, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomizePizza from './CustomizePizza';
import Carousel from "./Carousel";

axios.defaults.withCredentials = true;

const UserBody = (props) => {

    const [veg, setVeg] = useState(false    );
    const [nonveg, setNonveg] = useState(false);

    useEffect(() => {
        // props.setNoOfLikes(props.likes.length)
    }, [props.likes])

    useEffect(() => {
        // props.setNoOfCart(props.cart.length)
    }, [props.cart])

    useEffect(() => {
        props.pizzas.map((pizzaItem, index) => {
            if (pizzaItem.id === props.pizza.id) {
                props.setPizza(prev => ({
                    ...prev,
                    ["name"]: pizzaItem.name,
                    ["price"]: pizzaItem.price,
                    ["img"]: `http://localhost:5000/pizza/getimage/${pizzaItem.img}`,
                    ["veg"]: pizzaItem.veg
                }))
            }
        })
    }, [props.pizza.id])

    const closeCustomPizza = () => {

        if (props.pizza.id !== "") {
            props.setPizza(prev => ({
                ...prev,
                ["id"]: ""
            }))
        }
    }


    return (
        <>
            {props.ser==="" && <div className="box" onClick={closeCustomPizza}>

                <Box className="carousel-box" height={'40vw'} margin={'3%'} border={'1px solid rgba(130, 202, 250)'} sx={props.pizza.id !== "" && { opacity: 0.3 }}>
                    <Carousel />
                </Box>

            </div>}
            {props.ser === "" && <div className="box" onClick={closeCustomPizza}>
                <Box margin={'3%'} border={'1px solid rgba(130, 202, 250)'} sx={props.pizza.id !== "" && { opacity: 0.3 }}>
                    <Typography variant="h3" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" fontFamily={'Cabin'} >Available pizza
                        <div className="veg-nonveg-toggler">
                            {!veg && <Button variant="outlined" color={'success'} onClick={() => setVeg(!veg)}>veg</Button>}
                            {veg && <Button variant="contained" color={'success'} onClick={() => setVeg(!veg)}>veg</Button>}
                            {!nonveg && <Button variant="outlined" color={'error'} onClick={() => setNonveg(!nonveg)}>non-veg</Button>}
                            {nonveg && <Button variant="contained" color={'error'} onClick={() => setNonveg(!nonveg)}>non-veg</Button>}
                        </div>
                    </Typography>

                    <Box
                        margin={'auto'}
                        className={"user-cards-box"}
                    >

                        {props.pizzas.map((data) => {
                            var liked = false;
                            for (let i = 0; i < props.likes.length; ++i) {
                                if (props.likes[i] === data.id) {
                                    liked = true;
                                    break;
                                }
                            }
                            var carted = false;
                            for (let i = 0; i < props.cart.length; ++i) {
                                if (props.cart[i] === data.id) {
                                    carted = true;
                                    break;
                                }
                            }
                            if (veg && !nonveg)
                                return data.veg && <Card key={data.id} id={data.id} name={data.name} url={`http://localhost:5000/pizza/getimage/${data.img}`} price={data.price} veg={data.veg} pizza={props.pizza} setPizza={props.setPizza} isLiked={liked} isCarted={carted} likes={props.likes} setLikes={props.setLikes} cart={props.cart} setCart={props.setCart} />
                            else if (nonveg && !veg)
                                return !data.veg && <Card key={data.id} id={data.id} name={data.name} url={`http://localhost:5000/pizza/getimage/${data.img}`} price={data.price} veg={data.veg} pizza={props.pizza} setPizza={props.setPizza} isLiked={liked} isCarted={carted} likes={props.likes} setLikes={props.setLikes} cart={props.cart} setCart={props.setCart} />
                            return <Card
                                key={data.id}
                                id={data.id}
                                name={data.name}
                                url={`http://localhost:5000/pizza/getimage/${data.img}`}
                                price={data.price}
                                veg={data.veg}

                                pizza={props.pizza} setPizza={props.setPizza}

                                isLiked={liked} isCarted={carted}

                                likes={props.likes} setLikes={props.setLikes}
                                cart={props.cart} setCart={props.setCart}
                            />
                        }
                        )}

                    </Box>
                </Box>
            </div>}
            {props.ser !== "" && <Box margin={'3%'} border={'1px solid rgba(130, 202, 250)'} sx={props.pizza.id !== "" && { opacity: 0.3 }}>
                <Typography variant="h3" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" fontFamily={'Cabin'} >Search Results</Typography>
                <Box
                    margin={'auto'}
                    className={"user-cards-box"}
                >

                    {props.pizzas.map((data) => {
                        var liked = false;
                        for (let i = 0; i < props.likes.length; ++i) {
                            if (props.likes[i] === data.id) {
                                liked = true;
                                break;
                            }
                        }
                        var carted = false;
                        for (let i = 0; i < props.cart.length; ++i) {
                            if (props.cart[i] === data.id) {
                                carted = true;
                                break;
                            }
                        }

                        if (data.name.includes(props.ser)) {
                            return <Card
                                key={data.id}
                                id={data.id}
                                name={data.name}
                                url={`http://localhost:5000/pizza/getimage/${data.img}`}
                                price={data.price}
                                veg={data.veg}

                                pizza={props.pizza} setPizza={props.setPizza}

                                isLiked={liked} isCarted={carted}

                                likes={props.likes} setLikes={props.setLikes}
                                cart={props.cart} setCart={props.setCart}
                            />
                        }
                    }
                    )}

                </Box>
            </Box>}
        </>
    );
}

export default UserBody;