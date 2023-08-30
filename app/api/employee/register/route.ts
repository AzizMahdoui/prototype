import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Employee from "../../../../models/employee"; // Assuming you have an EmployeeModel defined in your "employee" model file
import dbConnect from "../../../../libs/db";
import qr from "qrcode";

export async function POST(req: NextRequest) {
  await dbConnect();
  const employeeData = await req.json();

  try {
    const existingUser = await Employee.findOne({ employeeId: employeeData.employeeId });
    if (existingUser) {
      return  NextResponse.json({ message: 'Employee already registered' });
    }

    // Generate a new MongoDB _id
    const _id = new mongoose.Types.ObjectId();

    const qrCodeData = `${_id}_${employeeData.employeeId}`;
    const qrCodeImageDataURL = await qr.toDataURL(qrCodeData);

    const newEmployee = new Employee({
      _id, // Include the generated _id
      ...employeeData,
      qrCode: qrCodeImageDataURL,
    });

    await newEmployee.save();

    return NextResponse.json({ success: true, data: newEmployee, message: 'Employee Registered Successfully' });
  } catch (error) {
    console.error('User registration error:', error);
    return  NextResponse.json({ message: 'An error occurred' });
  }
}
