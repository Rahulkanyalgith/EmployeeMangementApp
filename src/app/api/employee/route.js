import { connectDb } from "@/database/db";
import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";

connectDb();

export async function GET() {
    try {
        const getEmployee = await Employee.find();
        return NextResponse.json(getEmployee.length > 0 ? getEmployee : "Not Found")
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Failed to get employee",
            },
            {
                status: 404,
            }
        )
    }
}

export async function POST(request) {
    const { name, email, address, salary } = await request.json();

    // validation 
    if (!name || !email || !address || !salary) {
        return NextResponse.json(
            {
                error: "All fields must be required",
            },
            {
                status: 404,
            }
        )
    }

    // find employee through email
    const empl = await Employee.findOne({ email })

    if (empl) {
        return NextResponse.json(
            {
                error: "This employee already exists"
            },
            {
                status: 404,
            }
        )
    }

    const employee = new Employee({
        name,
        email,
        address,
        salary
    })

    try {
        const savedEmployee = await employee.save();
        return NextResponse.json(
            {
                savedEmployee,
                message: "Employee saved successfully"
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Failed to save employee",
            },
            {
                status: 404,
            }
        )
    }
}
