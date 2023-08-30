import { NextRequest, NextResponse } from "next/server";
import dailyDetails from "../../../models/dailyDetails";
import Shift from '../../../models/checkInCheckOut'
import Employee from '../../../models/employee'

interface AttendanceAlert {
  date: Date;
  id: string;
  status: 'checked-in'
}

export async function POST(req: NextRequest) {
  try {
    const { date, id, status }: AttendanceAlert = await req.json();
    
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);


    const employeeDailyStatus = await dailyDetails.findOne({ employeeId: id, date: { $gte: startOfDay, $lt: endOfDay } }).populate("employeeId")

    if (!employeeDailyStatus) {
      return NextResponse.json({ message: 'There is no Employee with this Id or The date of the shift is not set up yet' });
    }
    if(employeeDailyStatus.status==="checked-in"){
      return NextResponse.json({success:false, message: 'You have Already checked-in today' });

    }
      const checkInShift = new Shift({
        employeeId: id,
        checkIn: new Date(),
        checkOut: null, 
        status: status,
      });
      
      employeeDailyStatus.status = "checked-in";
      await employeeDailyStatus.save()
      await checkInShift.save()
      return NextResponse.json({ success: true, data: employeeDailyStatus, message: 'Employee have been checked in successfully' });

      
    }
   


   catch (err) {
    return NextResponse.json({ message: 'Something Wrong Happened' });
  }
}
