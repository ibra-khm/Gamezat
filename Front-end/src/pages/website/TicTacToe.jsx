import React from 'react'
import { Link } from "react-router-dom";
export default function TicTacToe() {
    return (
        <>
            <div className="h-screen relative flex gap-10 md:gap-0 flex-col">



                <div className="flex bg-blue-900 h-full p-20 md:p-0 items-center flex-wrap gap-28  justify-center     ">

                    <Link to={'/multiplayer-offline'} className="   w-56 h-48 hover:scale-105 transition-transform duration-500  ">
                        <img
                            alt="Tee"
                            src="https://cdn-icons-png.flaticon.com/512/3550/3550826.png"
                            className="  invert h-fit w-fit "
                        />
                        <p className=" text-white text-2xl font-bold text-center mt-2 " >Offline Multiplayer</p>
                    </Link>

                    <Link to={'/vs-ai'} className=" w-56 bg-blue-900 h-48 hover:scale-105 transition-transform duration-500  ">
                        <img
                            alt="Tee"
                            src="https://cdn-icons-png.flaticon.com/512/3550/3550818.png"
                            className="invert  h-fit w-fit "
                        />
                        <p className=" text-white text-2xl font-bold text-center mt-2 " >VS Computer</p>
                    </Link>
                </div>
            </div>



        </>
    )
}
