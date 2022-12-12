import axios from 'axios'
import { Card } from 'flowbite-react'
import React from 'react'
import { useContext } from 'react'
import { BsTable } from 'react-icons/bs'
import Postrequest from '../../components/dashboard/main/posts/Postrequest'
import PostsTable from '../../components/dashboard/main/posts/PostsTable'
import { AdminContext } from '../../context/AdminContext'

export default function DPosts() {
    const { allPosts, deletePost } = useContext(AdminContext)



    return (
        <>
            <div className=' flex flex-wrap gap-5 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-grass  dark:bg-slate-800'>
                <span className='flex items-center gap-5'>

                    <BsTable color='green' size={25} /> <p className='text-lg'>You can manage all the posts from here</p>
                </span>

                <Postrequest />

            </div>

            <div className=' flex flex-wrap gap-5 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-grass  dark:bg-slate-800'>
                <span className='flex items-center gap-5'>

                    <BsTable color='green' size={25} /> <p className='text-lg'>You can manage all the posts from here</p>
                </span>
                <PostsTable deletePost={deletePost} allPosts={allPosts} />

            </div>
        </>
    )
}
