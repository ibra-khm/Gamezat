import React from 'react'
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
export default function LastComments({ comments }) {
    return (
        <div className="max-w-lg">
            <Card>
                <div className="mb-4 flex gap-4 items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Latest Comments
                    </h5>
                    <Link
                        to={'/blah'}
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        View all
                    </Link>
                </div>
                <div className="flow-root">
                    <ul className="divide-y  divide-gray-200 dark:divide-gray-700 max-h-[300px] scrollbar-hide overflow-scroll">

                        {comments?.map((comment, i) => {

                            return <li key={i} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={comment.user.image}
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                            {comment.user.name}
                                        </p>

                                        <span className="truncate text-sm text-gray-500 dark:text-gray-400">
                                            {comment.comment}
                                        </span>

                                    </div>

                                </div>
                            </li>
                        })}

                    </ul>
                </div>
            </Card>
        </div>
    )
}
