import { Dropdown, TextInput, Pagination } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import Postrequest from './Postrequest';
export default function PostsTable({ allPosts, deletePost }) {
    useEffect(() => {
        console.log(allPosts);
    }, [allPosts])
    const [data, setData] = useState();
    const [search, setSearch] = useState('');
    const [columns, setColumns] = useState();
    const [w, setW] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [nPages, setNPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [indexOfLastRecord, setIndexOfLastRecord] = useState() // = currentPage * recordsPerPage;

    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage < 0 ? 0 : indexOfLastRecord - recordsPerPage;
    const [currentRecords, setCurrentRecords] = useState(allPosts)
    // const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);

    useEffect(() => {
        setData(allPosts)
    }, [allPosts])


    useEffect(() => {

        data?.length - ((currentPage - 1) * recordsPerPage) < recordsPerPage ? setIndexOfLastRecord(data?.length) : setIndexOfLastRecord(recordsPerPage * currentPage)
        const num = Math.ceil(data?.length / recordsPerPage);
        if (num) {

            num <= 1 ? setNPages(1) : setNPages(num)
        }
    }, [data, currentPage, recordsPerPage])

    useEffect(() => {
        // setCurrentRecords()
        if (search == '') {
            setCurrentRecords(data?.slice(indexOfFirstRecord, indexOfLastRecord))
        } else {
            // const searchedData = data?.filter((i) => {
            //     i.includes(search.toLowerCase())
            // })
            const filtered = data?.filter(entry => Object.values(entry).some(val => (typeof val === "string" && (val.toLowerCase()).includes(search.toLowerCase())) || (typeof val === "number" && (val.toString()).includes(search.toString()))));
            // const filtered = data?.filter(entry => Object.values(entry).some(val => typeof val === "string" && (val.toLowerCase()).includes(search.toLowerCase())));
            // setCurrentRecords(data?.slice(indexOfFirstRecord, indexOfLastRecord))
            setCurrentRecords(filtered)
            // currentRecord
        }
    }, [data, search, indexOfFirstRecord, indexOfLastRecord])




    // check state effect


    useEffect(() => {
        setColumns([

            {
                name: "Id",
                id: 'id',
            },
            {
                name: "Content",
                id: 'content',
            },
            {
                name: "Comments Num",
                id: 'commentsCount',
            },
            {
                name: "Owner Email",
                id: 'userEmail',
            },
            {
                name: "Owner Name",
                id: 'userName',
            },
            {
                name: "Date",
                id: 'created_at',
            },

        ])
    }, [])
    function sortByKey(array, key, sort) {
        sort ? setData([...array].sort((a, b) => a[key] < b[key] ? 1 : -1)) : setData([...array].sort((a, b) => a[key] > b[key] ? 1 : -1))
        setW(!w)
    }



    return (
        <>
            <div className='flex flex-col w-full'>
                
                

                <TextInput
                    id="email1"
                    type="email"
                    placeholder="Search"
                    required={true}
                    className='w-52 my-2'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div
                    className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl"
                >

                    <table
                        className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700 "
                    >
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                {
                                    columns?.map((col, i) => {
                                        return (
                                            <th
                                                key={i}
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {col.name}

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-gray-700 cursor-pointer dark:text-gray-200"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        onClick={() => sortByKey(data, col.id, w)}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </th>
                                        )
                                    })
                                }

                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                            {
                                currentRecords?.length > 0 ?
                                    currentRecords?.map((item, i) => {
                                        return (
                                            <tr key={i} className="dark:bg-gray-900">

                                                <td
                                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    {item.id}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                                >
                                                    {item.content}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                                >
                                                    {item.commentsCount}
                                                </td>
                                                <td
                                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                                >
                                                    {item.userEmail}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">

                                                    {item.userName}

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">

                                                    {item.created_at.slice(0, item.created_at.indexOf("T"))}

                                                </td>

                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">

                                                    <button className='p-2 text-amber' onClick={() => deletePost(item.id)} ><AiFillDelete size={20} /></button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr className="dark:bg-gray-900">

                                        <td colSpan={columns?.length} >
                                            <div className='flex justify-center items-center    '>
                                                <p>No Data Was Found</p>
                                            </div>
                                        </td>

                                    </tr>
                            }



                        </tbody>
                        <tfoot>
                            <tr  >
                                <td colSpan={columns?.length}>
                                    <div className='flex justify-around items-center    '>
                                        <div>
                                            {
                                                search === '' ?
                                                    <span>{indexOfFirstRecord + 1}-{indexOfLastRecord} of {data?.length}</span>
                                                    :
                                                    <span>Results found: {currentRecords?.length}</span>
                                            }
                                        </div>
                                        <Pagination
                                            className={` ${(nPages == 1 || search !== '') && 'invisible'}  pb-2`}
                                            currentPage={currentPage}
                                            totalPages={nPages}
                                            onPageChange={(e) => setCurrentPage(e)}
                                        />
                                        <div className={`flex gap-2 items-center ${search !== '' && 'invisible'}`}>
                                            <label className="text-sm whitespace-nowrap text-white">Rows per page:</label>
                                            <div className="mx-auto  w-full ">
                                                <div className="my-1 scale-90">
                                                    <select onChange={(e) => setRecordsPerPage(parseInt(e.target.value))} className=" block  dark:bg-slate-700 rounded-md border border-gray-300 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                        <option defaultValue="10">10</option>
                                                        <option defaultValue="20">20</option>
                                                        <option defaultValue="30">30</option>
                                                        <option defaultValue="50">50</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div >
            </div>
        </>
    )
}
