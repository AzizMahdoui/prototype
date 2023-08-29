import {NextRequest,NextResponse} from "next/server"
import dbConnect from "../../../../libs/db"
import { Shift } from "../../employee/register/route"
import shift from "../../../../models/checkInCheckOut"
import employee from "../../../../models/employee"
export  async function POST(req:NextRequest){
        await dbConnect()
        try{
             const data:Shift =await req.json()
             const updatedEmployee = await employee.findById(data.employeeId)
             
            const newShift = new shift(data)
            updatedEmployee.shiftsHistory.push(newShift._id)
            await updatedEmployee.save()
            await newShift.save()
            return NextResponse.json({ success: true, data: newShift, message: 'shift Registered Successfully' });

        }catch(err){
            return NextResponse.json({ message: 'An error occurred' });

        }

}