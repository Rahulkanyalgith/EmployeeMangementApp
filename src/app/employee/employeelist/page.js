"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
    const [employee, setEmployee] = useState([]);

    const getEmployeeList = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee`, {
            method: 'GET'
        })
        const data = await res.json();

        setEmployee(data)
    }

    const deleteEmployee = async (_id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/${_id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        })

        const data = await res.json();
        // console.log(data)
        const { message, error } = data

        if (error) {
            alert(error)
        }
        else {
            alert(message)
        }
        getEmployeeList();
    }

    useEffect(() => {
        getEmployeeList();
    }, []);
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden ">
                            <div className="p-2 bg-gray-50 border-b flex gap-2 items-center">
                                <Link href='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Link>
                                <h1 className=' text-center text-2xl font-semibold'>Employee Detail List</h1>
                            </div>
                            <table className=" w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
                                        >
                                            S.No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Salary
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Action
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase "
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {employee.map((item, index) => {
                                    const { _id, name, email, address, salary } = item
                                    return (
                                        <tbody key={index} className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                    {index + 1}.
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                    {name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                    {email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                    {address}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                    ₹ {salary}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={_id} className="text-green-600">
                                                        Edit
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="text-red-600 cursor-pointer " onClick={()=>{
                                                        deleteEmployee(_id)
                                                    }}>
                                                        Delete
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;