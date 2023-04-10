import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';

function Carousel() {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    useEffect(()=>{
        setWidth(ref.current.offsetWidth);
        console.log(ref.current.offsetWidth);
    })
    useLayoutEffect(() => {
        const fun = () => {
            setWidth(ref.current.offsetWidth);
            console.log(ref.current.offsetWidth);
        }
        window.addEventListener('resize', fun);
    }, [])

    const strs = [`<span style="font-size: ${width/25}px; padding: 0% 2%">Here you can order your pizzas you like or you can make your own Customize pizza.</span>`, `<span style="font-size: ${width/25}px; padding: 0% 2%">24/7 food service available.</span>`, `<span style="font-size: ${width/25}px; padding: 0% 2%">All payments are available.</span>`]

    useEffect(() => {
        var obj = document.querySelector(".slider")
        var i = 0
        setInterval(function () {
            if (i <= obj.offsetWidth * 2) {
                i += (obj.offsetWidth)
                obj.scroll(i, 0);
            }
            else {
                i = 0
                obj.scroll(i, 0);
            }
        }, 2000);
    }, [])

    return (
        <div className='slider'>
            <div class="carousel-content" ref={ref}>
                <h1 style={{ fontSize: `${width / 15}px` }}>Welcome,</h1>
                <Typewriter options={{ strings: strs, delay: 50, autoStart: true, loop: true, cursor: `<span style="font-size: ${width/25}px;">|</span>` }} />
            </div>
            <img src='https://media.istockphoto.com/photos/whole-italian-pizza-on-wooden-table-with-ingredients-picture-id1048400936?k=20&m=1048400936&s=612x612&w=0&h=fPRKreYthnwvfa1x9WT6e13PtTSvK9ClhxkKOM6zhSk=' />
            <img src='https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=' />
            <img src='https://st.depositphotos.com/1900347/4146/i/450/depositphotos_41466555-stock-photo-image-of-slice-of-pizza.jpg' />
        </div>
    );
}

export default Carousel;
