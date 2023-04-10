// REACT MODULES
import React, { useState, useEffect } from "react";

// MODULE COMPONENTS
import { useSelector } from 'react-redux';
import axios from "axios";

// COMPONENTS
import UserNavbar from "./UserNavbar";
import UserBody from "./UserBody";
import UserLikes from "./UserLikes";
import UserCart from "./UserCart";
import CustomizePizza from "./CustomizePizza";

const UserDashboard = () => {
    
    const [pizza, setPizza] = useState({
        id: "",
        name: "",
        price: Number,
        img: "",
        veg: Boolean
    })

    const [likesPage, setLikesPage] = useState(false);
    const [cartPage, setCartPage] = useState(false);

    // FETCHING LIKES
    const [likes, setLikes] = useState([]);
    const fetchLikes = async () => {
        console.log("fetching likes");
        const res = await axios.post("http://localhost:5000/user/getlikes", {
            email: localStorage.getItem('user')
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        (async () => {
            const data = await fetchLikes();
            
            data.likes.forEach((like) => {
                setLikes(oldLikes => [...oldLikes, like]);
            })
            
        })();
    }, [])

    // FETCHING CART
    const [cart, setCart] = useState([]);
    const fetchCart = async () => {
        const res = await axios.post("http://localhost:5000/user/getcart", {
            email: localStorage.getItem('user')
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        (async () => {
            const data = await fetchCart();

            data.cart.forEach((cartItem) => {
                setCart(oldCart => [...oldCart, cartItem]);
            })
        })();
    }, [])

    // FETCHING PIZZAS
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

    const [ser, setSer] = useState("");

    return (
        <div>
            <UserNavbar
                pizza={pizza} setPizza={setPizza}
                likesPage={likesPage} setLikesPage={setLikesPage}
                cartPage={cartPage} setCartPage={setCartPage}
                likes={likes}
                cart={cart}
                pizzas={pizzas}
                setSer = {setSer}
                defaultValue={""}
            />
            {!likesPage && !cartPage && <UserBody 
                pizza={pizza} setPizza={setPizza}
                likes={likes} setLikes={setLikes}
                cart={cart} setCart={setCart}
                pizzas={pizzas}
                ser={ser} setSer={setSer}
            />}
            {likesPage && !cartPage && <UserLikes
                pizza={pizza} setPizza={setPizza}
                likes={likes} setLikes={setLikes}
                cart={cart} setCart={setCart}
                pizzas={pizzas}
            />}
            {cartPage && !likesPage && <UserCart
                pizza={pizza} setPizza={setPizza}
                likes={likes} setLikes={setLikes}
                cart={cart} setCart={setCart}
                pizzas={pizzas}
            />}
            {pizza.id !== ""   && <CustomizePizza pizza={pizza} setPizza={setPizza} />}
        </div>
    );
}

export default UserDashboard;