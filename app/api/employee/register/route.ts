import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Employee from "../../../../models/employee";
import dbConnect from "../../../../libs/db";
import qr from "qrcode"

export interface Shift {
  employeeId:String
  startTime: string;
  endTime: string;
}

export interface Employee extends mongoose.Document {
  firstName: string;
  lastName: string;
  password:String
  employeeId: string;
  phoneNumber: string;
  position: string;
  shiftHistory: String[];
  qrcode:String;
  avatar:String;
}
  
  
export async function POST(req: NextRequest) {
  await dbConnect();
  const employee: Employee = await req.json();

  try {
    const existingUser = await Employee.findOne({ employeeId: employee.employeeId });
    if (existingUser) {
      return NextResponse.json({ message: 'Employee already registered' });
    }

    const qrCodeData = `${employee._id}_${employee.employeeId}`;
    const qrCodeImageDataURL = await qr.toDataURL(qrCodeData);

    const newEmployee = new Employee({
      ...employee,
      qrCode: qrCodeImageDataURL, 
    });

    await newEmployee.save();

    return NextResponse.json({ success: true, data: newEmployee, message: 'Employee Registered Successfully' });
  } catch (error) {
    console.error('User registration error:', error);
    return NextResponse.json({ message: 'An error occurred' });
  }
}
  

