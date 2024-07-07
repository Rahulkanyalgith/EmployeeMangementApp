import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    // Get employeeId From params 
    const { employeeId } = params;

    try {
        // Create Get Single Employee
        const getSingleEmployee = await Employee.findById(employeeId)

        // Return getSingleEmployee and status 
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

        // Return Error And status 
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

//ROUTE 4 : UPDATE[PUT] Employee Detail [http://localhost:3000/api/employee/employeeId]
export async function PUT(request, { params }) {
    // Get employeeId From params 
    const { employeeId } = params;

    // Get Data From Frontend 
    const { name, email, address, salary } = await request.json();

    try {
        // Create Employee ( Get Employee By Id )
        let employee = await Employee.findById(employeeId);
        // set employee name 
        employee.name = name;
        // set employee email 
        employee.email = email;
        // set employee address 
        employee.address = address;
        // set employee salary 
        employee.salary = salary;

        // Create Update Employee
        const updatedEmployee = await employee.save();

        // Return updatedEmployee, message and status 
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

        // Return Error And Status 
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