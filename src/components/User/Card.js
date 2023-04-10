import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { Button } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import axios from "axios";

const Card = (props) => {

    const [lovehover, setLoveHover] = useState();
    const [carthover, setCartHover] = useState();
    const [currLike, setCurrLike] = useState(props.isLiked);
    const [currCart, setCurrCart] = useState(props.isCarted);

    const borderColor = (props.veg) ? 'lightgreen' : 'rgb(233, 92, 92)'

    useEffect(() => {
        setCurrLike(props.isLiked)
    }, [props.isLiked])

    useEffect(() => {
        setCurrCart(props.isCarted)
    }, [props.isCarted])

    const toggleLike = async (e, id) => {

        if (!currLike) {
            const res = await axios.post("http://localhost:5000/user/addlike", {
                id: id
            }).then(res => console.log(res))
                .catch(err => console.log(err))
            console.log("out", res);
            props.setLikes(prevLikes => [...prevLikes, id])
        }
        else {
            const res = await axios.post("http://localhost:5000/user/removelike", {
                id: id
            }).then(res => console.log(res))
                .catch(err => console.log(err))
            console.log("out", res);
            props.setLikes((prevLikes) => prevLikes.filter((like) => like !== id))
        }
    }

    const toggleCart = async (e, id) => {
        if (!currCart) {
            const res = await axios.post("http://localhost:5000/user/addcart", {
                id: id
            }).then(res => console.log(res))
                .catch(err => console.log(err))
            console.log("out", res);
            props.setCart(prevCart => [...prevCart, id])
        }
        else {
            const res = await axios.post("http://localhost:5000/user/removecart", {
                id: id
            }).then(res => console.log(res))
                .catch(err => console.log(err))
            console.log("out", res);
            props.setCart((prevCart) => prevCart.filter((cartItem) => cartItem !== id))
        }
    }

    const customizePizza = () => {
        console.log("buy clicked");
        props.setPizza(prev => ({
            ...prev,
            ["id"]: props.id
        }))
    }
    const ref = useRef(null);
    const [width, setWidth] = useState(250);
    const [fs, setFs] = useState('large');
    useLayoutEffect(()=>{
        const fun = ()=>{
            setWidth(ref.current.offsetWidth);
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
        <div className="user-grid-card">
            <div className="usercard" ref={ref} style={{ border: `3px solid ${borderColor}`, boxShadow: `inset 2px 2px 5px 0px ${borderColor}, inset -2px -2px 5px 0px ${borderColor}, 0 4px 30px rgba(35, 35, 35, 0.4)` }}>

                <div className="img-div"><img src={props.url} style={{ width: '100%', height: '100%' }} /></div>
                <div className="h5-div"><h5 style={{fontSize: `${width/10}px`}} >{props.name}</h5></div>
                <h5 style={{fontSize: `${width/10}px`}}>{props.price}/-</h5>
                <div className="usercard-icons">
                    <span 
                        className="icons"
                        onMouseOver={() => setLoveHover(true)}
                        onMouseOut={() => setLoveHover(false)}
                        onClick={(e) => toggleLike(e, props.id)}
                    >
                        {!currLike && !lovehover && <FavoriteBorderIcon fontSize={fs} />}
                        {(currLike || (!currLike && lovehover)) && <FavoriteIcon fontSize={fs} />}
                    </span>
                    <Button size="small" className="buy-btn" variant="contained" onClick={customizePizza} >Buy</Button>
                    <span
                        className="icons"
                        onMouseOver={() => setCartHover(true)}
                        onMouseOut={() => setCartHover(false)}
                        onClick={(e) => toggleCart(e, props.id)}
                    >
                        {!currCart && !carthover && <ShoppingCartOutlinedIcon fontSize={fs} />}
                        {(currCart || (!currCart && carthover)) && <ShoppingCartIcon fontSize={fs} />}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;