import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";

import { Box, Typography } from '@mui/material'
import Card from "./Card";

const UserLikes = (props) => {
    const closeCustomPizza = () => {

        if (props.pizza.id !== "") {
            props.setPizza(prev => ({
                ...prev,
                ["id"]: ""
            }))
        }
    }
    return (
        <Box margin={'3%'} border={'1px solid rgba(130, 202, 250)'} onClick={closeCustomPizza} sx={props.pizza.id !== "" && { opacity: 0.3 }}>
            <Typography variant="h3" padding={'0.7% 1%'} backgroundColor="rgba(130, 202, 250)" fontFamily={'Cabin'} >Likes</Typography>
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
                    return liked && <Card
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
    );
}

export default UserLikes;