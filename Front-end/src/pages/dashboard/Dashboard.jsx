import React, { useContext } from 'react'
import { CgGames, CgSmileMouthOpen } from 'react-icons/cg';
import { GoReport } from 'react-icons/go';
import { SiApostrophe } from 'react-icons/si';
import { FaRegCommentDots } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';



import { AdminContext } from '../../context/AdminContext';
import LastJoined from '../../components/dashboard/main/LastJoined';
import LastComments from '../../components/dashboard/main/LastComments';

export default function Dashboard() {
    const { prevData } = useContext(AdminContext);
    return (
        <>
            <div className=' flex flex-wrap gap-5 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-grass  dark:bg-slate-800'>

                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-green-600 ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    <  CgSmileMouthOpen className={`ml-5 text-green-600`} size={50} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            {prevData?.usersCount} Users
                        </div>
                    </div>
                </div>
                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-indigo ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    < CgGames className={`ml-5 text-indigo`} size={50} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            1.6K HTML5 Game
                        </div>
                    </div>
                </div>
                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-amber ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    < GoReport className={`ml-5 text-amber`} size={40} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            {prevData?.reportsCount} Reports
                        </div>
                    </div>
                </div>

                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-yellow-300 ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    < SiApostrophe className={`ml-5 text-yellow-300`} size={40} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            {prevData?.productCount} Products
                        </div>
                    </div>
                </div>
                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-blue-600 ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    < FaRegCommentDots className={`ml-5 text-blue-600`} size={40} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            {prevData?.commentsCount} Comments
                        </div>
                    </div>
                </div>
                <div className={`max-w-sm mx-auto bg-white shadow-md shadow-orange-500 ring-1 ring-black/5 rounded-xl flex items-center gap-2`}>
                    < MdPostAdd className={`ml-5 text-orange-500`} size={40} />
                    <div className="min-w-0 py-5 pl-3 pr-5">
                        <div className="text-slate-900 font-medium text-sm sm:text-base truncate">
                            {prevData?.postsCount} Posts
                        </div>
                    </div>
                </div>


            </div>
            <div className=' flex flex-wrap justify-evenly gap-5  m-9 p-10 rounded-3xl border-t-4 shadow-lg border-indigo  dark:bg-slate-800'>
                <LastJoined users={prevData?.usersPrev} />
                <LastComments comments={prevData?.allComments} />
            </div>


        </>
    )
}
