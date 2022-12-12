import React from 'react';
import img from '../img/3.png.png'

export default function Banner() {
    return (
        <div className='' >
            <img src={img} className="w-72 absolute  lg:left-[43%] mt-24 md:left-[40%]  sm:left-[30%] font-bold  text-5xl text-white" alt="" />
            <span className='absolute  lg:left-[39%] mt-80 sm:left-[22%]  font-bold  text-5xl text-white'>Gamezat WebSite</span>
            <img className='w-full h-[700px] object-cover object-center' src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg" alt="" />

        </div>
    );
}
