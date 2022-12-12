import React from 'react';
import { Card } from 'flowbite-react'

export default function Rgames() {
    return (
        <>
            <div className="max-w-full">
                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Games
                        </h5>
                        <a
                            href="#"
                            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Games
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="inline-flex items-center text-base font-semibold text-gray-900dark:text-white">
                                            email@windster.com
                                        </p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                            Content
                                        </p>
                                    </div>
                                    <div className="truncate text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        Type
                                    </div>
                                </div>
                            </li>






                        </ul>
                    </div>
                </Card>
            </div>
        </>
    );
}
