import { Table } from 'flowbite-react'
import React, { useContext } from 'react'
import { AdminContext } from '../../../../context/AdminContext'
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function UsersTable() {

    const { allUsers, setAllUsers, changeUserData, delUser } = useContext(AdminContext)

    return (
        <Table className='w-full' hoverable={true}>
            <Table.Head>
                <Table.HeadCell>
                    Email
                </Table.HeadCell>
                <Table.HeadCell>
                    Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Country
                </Table.HeadCell>
                <Table.HeadCell>
                    Age
                </Table.HeadCell>
                <Table.HeadCell>
                    Role
                </Table.HeadCell>
                <Table.HeadCell>
                    Delete
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {
                    allUsers?.map((user, i) => {
                        return <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell onBlur={(e) => changeUserData("email", e.target.innerText, user?.id, user?.email)} contentEditable className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user?.email}
                            </Table.Cell >
                            <Table.Cell onBlur={(e) => changeUserData("name", e.target.innerText, user?.id, user?.name)} contentEditable>
                                {user?.name}
                            </Table.Cell>
                            <Table.Cell onBlur={(e) => changeUserData("country", e.target.innerText.toString(), user?.id, user?.country)} contentEditable>
                                {user?.country}
                            </Table.Cell>
                            <Table.Cell onBlur={(e) => changeUserData("age", e.target.innerText, user?.id, user?.age)} contentEditable>
                                {user?.age}
                            </Table.Cell>
                            <Table.Cell onBlur={(e) => changeUserData("role", e.target.innerText, user?.id, user?.role)} contentEditable>
                                {user?.role}
                            </Table.Cell>
                            {
                                user.role != 'admin' ?
                                    <Table.Cell>
                                        <RiDeleteBin6Fill onClick={() => delUser(user?.id)} size={20} className='text-red-400 hover:text-red-600 cursor-pointer' />
                                    </Table.Cell> : null
                            }
                        </Table.Row>
                    })
                }

            </Table.Body>
        </Table>
    )
}
