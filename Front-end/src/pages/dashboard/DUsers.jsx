import React from 'react'
import { FaUsers } from 'react-icons/fa';
import UsersTable from '../../components/dashboard/main/users/UsersTable';
export default function DUsers() {
    return (
        <div className='flex flex-wrap gap-10 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-indigo  dark:bg-slate-800'>
            <span className='flex items-center gap-5'>

                <FaUsers color='indigo' size={25} /> <p className='text-lg'>You can manage all the users from here</p>
            </span>
            <div className='w-full  '>
                <UsersTable />
            </div>


        </div>
    )
}
