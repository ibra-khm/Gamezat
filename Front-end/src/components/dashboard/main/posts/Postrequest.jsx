import React, { useContext } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { AdminContext } from '../../../../context/AdminContext';

export default function Postrequest({ post }) {
    const { uap, acceptPost, rejectPost } = useContext(AdminContext)

    return (
        <>
            {uap.map(post => {
                return < div className='w-full' >
                    <div className='flex flex-wrap gap-10 mt-10 mb-10 rounded-3xl dark:bg-slate-800 '>
                        <div key="" className="bg-white dark:bg-gray-800 border-gray-200 w-80 dark:border-gray-800 p-4  border shadow-lg max-w-md mb-2">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <img referrerPolicy='no-referrer' className="h-11 w-11 rounded-full " src={post?.user?.image} />
                                    <div className="ml-1.5 text-sm leading-tight">
                                        <span className="text-black dark:text-white font-bold block ">{post?.user?.name}</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-normal block">{post?.user?.email}</span>
                                    </div>
                                </div>

                                {/* <svg className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg> */}
                            </div>
                            <div className="text-black dark:text-white block text-xl leading-snug mt-3">

                                <ReactReadMoreReadLess
                                    charLimit={200}
                                    readMoreText={<MdExpandMore rounded={true} className='rounded inline hover:shadow-xl  hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out' />}
                                    readLessText={<MdExpandLess rounded={true} className='rounded inline hover:shadow-xl hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out' />}
                                >{post.content}</ReactReadMoreReadLess>
                            </div>
                            {
                                post?.image ?
                                    <img referrerPolicy='no-referrer' className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 " src={post?.image} />
                                    : null
                            }

                            <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>

                            <div className='flex gap-3 mt-4 justify-center'>
                                <div>
                                    <button onClick={() => acceptPost(post?.id)} type="button" class="inline-block px-10  py-3 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out" >Accept</button>
                                </div>
                                <div>
                                    <button onClick={() => rejectPost(post?.id)} type="button" class="inline-block px-10     py-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Reject</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            })}


        </>

    );
}
