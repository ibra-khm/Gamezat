import React from 'react'
import { Outlet } from "react-router-dom";
import SideBarDash from '../components/dashboard/SideBarDash';



export default function UserEnd() {
    return (
        <>
            <div className='flex'>

                <SideBarDash />
                <div className='flex-1 justify-center'>

                    {/* An <Outlet> renders whatever child route is currently active in App.js */}
                    <Outlet />
                </div>
            </div>


        </>
    )
}
