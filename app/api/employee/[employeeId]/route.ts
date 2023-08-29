import {NextRequest,NextResponse} from "next/server"
import dbConnect from "../../../../libs/db"
import Employee from "../../../../models/employee";
import { redirect } from "next/navigation";

export async function GET (req:NextRequest,{params}:{params:{employeeId:String}}){

    await dbConnect();
    try{
      const employee = await Employee.findById(params.employeeId)
      // console.log(employee)
      if(!employee){
        return NextResponse.json({ success: false, data: employee, message: 'Employee Does not Exist' });

      }
      return NextResponse.json({ success: true, data: employee, message: 'Employee Retrieved Successfully' });
    }catch (error) {
    console.error('User registration error:', error);
    return NextResponse.json({ message: 'An error occurred' });
  }
}