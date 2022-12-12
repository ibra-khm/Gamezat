import React from 'react';
import { useContext } from 'react';
import { Card } from 'flowbite-react'
import { AdminContext } from '../../../context/AdminContext';
import { FcComments } from 'react-icons/fc';
import { HiSpeakerphone } from 'react-icons/hi';
import { FaCommentAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
export default function Rpost() {
    const { delReport, delPost, RP } = useContext(AdminContext);
    return (
        <>
            <div className="max-w-full">
                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Posts
                        </h5>
                        <p

                            className="text-sm font-medium  "
                        >
                            Manage
                        </p>
                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">

                            {
                                RP ? RP?.map((rc, i) => {

                                    return <li key={rc?.id + 2} className="py-3 sm:py-4  ">
                                        <div className="flex items-center justify-between space-x-4">
                                            <div className="shrink-0">
                                                <FaCommentAlt className='' size={20} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="inline-flex items-center text-base font-semibold text-gray-900dark:text-white">
                                                    Feedback: {rc?.feedback}
                                                </p>
                                                <p className="truncate text-sm text-black">
                                                    Post:  {rc?.content}
                                                </p>
                                            </div>
                                            <span className='flex gap-3 items-center'>

                                                <HiSpeakerphone onClick={() => delReport(rc?.id)} size={25} className='hover:text-amber cursor-pointer' />
                                                <AiFillDelete onClick={() => delPost(rc?.id, rc?.post_id)} size={25} className='hover:text-red-700 text-red-500 cursor-pointer' />

                                            </span>
                                        </div>
                                    </li>
                                })
                                    : <p>No Reports</p>
                            }

                        </ul>
                    </div>
                </Card>
            </div>
        </>
    );
}
