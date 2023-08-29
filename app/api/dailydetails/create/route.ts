import {NextRequest,NextResponse} from "next/server"
import dbConnect from "../../../../libs/db"
import { DailyDetail } from "../../../../libs/exports"
import dailyDetails from "../../../../models/dailyDetails"
export  async function POST(req:NextRequest){
        await dbConnect()
        try{
             const data:DailyDetail =await req.json()
            const newEmployeeDailyDetail = new dailyDetails(data)
            await newEmployeeDailyDetail.save()
            return NextResponse.json({ success: true, data: newEmployeeDailyDetail, message: 'Employee Registered Successfully' });

        }catch(err){
            return NextResponse.json({ message: 'An error occurred' });

        }

}