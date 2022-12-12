import React, { useEffect, useState, useContext } from 'react'
import { FiTrash2 } from 'react-icons/fi';
import { BsHeart } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Dropdown } from 'flowbite-react';
import ReactReadMoreReadLess from "react-read-more-read-less";

import axios from 'axios';

export default function Community() {
    const [blogs, setBlogs] = useState([]);
    const APIURL =
        "/api/posts";
    useEffect(() => {
        axios.get(APIURL).then((response) => {
            const data = response.data.data
            data.sort(() => Math.random() - 0.5)
            const newData = data.slice(0, 4)
            setBlogs(newData);
            console.log(newData);
        });
    }, []);


    return (
        <>
            <div className='flex dark:bg-blue-900 justify-around flex-wrap  p-10 rounded-3xl border-t-4 shadow-lg w-[95%] mx-auto border-amber  dark:bg-slate-800'>

                {

                    blogs.length === 0 ? <p className="text-3xl text-center">No Posts</p>

                        : blogs?.map((blog) => {
                            return (
                                <div key={blog?.id} className="bg-white dark:bg-gray-800 rounded border-gray-200 w-80 dark:border-gray-800 p-4  border shadow-lg max-w-md mb-2">
                                    <div className="flex justify-between">
                                        <div className="flex items-center">
                                            <img className="h-11 w-11 rounded-full " src={blog?.user.image} />
                                            <div className="ml-1.5 text-sm leading-tight">
                                                <span className="text-black dark:text-white font-bold block ">{blog?.user.name}</span>
                                                <span className="text-gray-500 dark:text-gray-400 font-normal block">{blog?.user.email}</span>
                                            </div>
                                        </div>
                                    
                                        {/* <svg className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg> */}
                                    </div>
                                    <div className="text-black dark:text-white block text-xl leading-snug mt-3">

                                        <ReactReadMoreReadLess
                                            charLimit={200}
                                            readMoreText={<MdExpandMore rounded={true} className='rounded inline hover:shadow-xl  hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out' />}
                                            readLessText={<MdExpandLess rounded={true} className='rounded inline hover:shadow-xl hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out' />}
                                        >{blog?.content}</ReactReadMoreReadLess>
                                    </div>
                                    <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 " src={blog?.image} />

                                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>



                                </div>
                            )
                        })}
            </div>

        </>
    )
}