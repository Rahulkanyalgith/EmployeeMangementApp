import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";


export async function GET(reuest, { params }) {
    const { employeeId } = params;

    try {
        const getSingleEmployee = await Employee.findById(employeeId)
        return NextResponse.json(
            {
                getSingleEmployee,
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: 'failed to get single employee',
            },
            {
                status: 404,
            }
        )
    }
}

export async function PUT(request, { params }) {
    const { employeeId } = params;

    const { name, email, address, salary } = await request.json();

    try {
        let employee = await Employee.findById(employeeId);
        employee.name = name;
        employee.email = email;
        employee.address = address;
        employee.salary = salary;

        const updatedEmployee = await employee.save();
        return NextResponse.json(
            {
                updatedEmployee,
                message: "Employee Updated Successfully"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: 'failed to update employee',
            },
            {
                status: 404,
            }
        )
    }
}


export async function DELETE(request, { params }) {
    const { employeeId } = params;

    try {
        await Employee.deleteOne({
            _id: employeeId
        })
        return NextResponse.json(
            {
                message: "Employee deleted successfully"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: 'failed to delete employee',
            },
            {
                status: 404,
            }
        )
    }
}