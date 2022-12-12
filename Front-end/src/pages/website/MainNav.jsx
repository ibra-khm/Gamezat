import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import RegistrationPortal from '../../components/website/registration/RegistrationPortal';
import { AuthContext } from '../../context/AuthContext';
import NavUserDropIcon from '../../components/website/profile/NavUserDropIcon';
import { Link } from 'react-router-dom';
import { DarkThemeToggle } from 'flowbite-react';
export default function MainNav() {

    const { showPortal, setShowPortal, user, token } = useContext(AuthContext)
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="medium"
                className="p-1 dark:text-gray-100 font-normal"
            >
                <Link to={'/'} className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                className="p-1 dark:text-gray-100   font-normal"
            >
                <Link to={'/games'} className="flex  items-center">
                    Games
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                className="p-1 dark:text-cream font-normal"
            >
                <Link to={'/community'} className="flex items-center">
                    Gamers Hub
                </Link>
            </Typography>



            <Typography
                as="li"
                variant="medium"
                className="p-1 dark:text-white font-normal"
            >
                <Link to={'/affiliate'} className="flex items-center">
                    Affiliate
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                className="p-1 dark:text-cream font-normal"
            >
                <Link to={'/xo'} className="flex items-center">
                    TiTacToe
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/contact'} className="flex items-center">
                    Contact
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/about'} className="flex items-center">
                    About
                </Link>
            </Typography>
        </ul>

    );

    return (
        <>
            <div className='max-w-screen text-white  '>
                <Navbar className="absolute z-10 position-sticky top-0  lg:max-h-[70px] lg:inset-0 transition duration-300 hover:duration-300 ease-in-out dark:bg-white/40 border-none hover:shadow-lg mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 text-white">
                    <div className="container mx-auto flex items-center justify-between text-blue-gray-900 dark:text-gray-100 ">
                        <div className='flex row'>
                            <Typography


                                variant="small"
                                className="mr-4 mt-1 cursor-pointer py-1.5 font-normal"
                            >
                                <Link to={'/'} >Gamezat</Link>
                            </Typography>
                            <DarkThemeToggle />
                        </div>
                        <div className="hidden  lg:block ">{navList}</div>
                        {

                            token && user ?
                                <NavUserDropIcon />
                                : <Button onClick={() => {
                                    setShowPortal(!showPortal);
                                    console.log("hi")
                                }} variant="gradient" size="sm" className="hidden bg-indigo lg:inline-block">
                                    <span>Register</span>
                                </Button>

                        }

                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                    <MobileNav open={openNav}>
                        {navList}
                    </MobileNav>

                </Navbar>
            </div>
            <RegistrationPortal />
        </>
    );
}
