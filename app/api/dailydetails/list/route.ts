import { DailyDetail } from "../../../../libs/exports";
import DailyDetails from '../../../../models/dailyDetails'
import Shift from "../../../../models/checkInCheckOut"
import dbConnect from "../../../../libs/db";
import Employee from '../../../../models/employee'
import { NextResponse,NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { date } = await req.json();
  const formattedDate = new Date(date).toISOString()

  await dbConnect();

  const startOfDay = new Date(formattedDate);
  const endOfDay = new Date(formattedDate);
  endOfDay.setDate(endOfDay.getDate() + 1);
  try {
        const existingAttendance = await DailyDetails.find({
          date: { $gte: startOfDay, $lt: endOfDay }
        }).populate('employeeId');

    if (existingAttendance.length === 0) {
          const employees = await Employee.find().select(['_id', "firstName", "lastName", "avatar"]);


          if(!employees){
            return NextResponse.json({ success: false, message: 'There are no employees' });
          }
          const defaultAttendances = await Promise.all(employees.map(async (employee, index) => {
            const dailyData = new DailyDetails({
              employeeId: employee._id,
              date: new Date(formattedDate),
              status: 'pending',
            });
        
            await dailyData.save();
            return dailyData.populate('employeeId');
          }));
        
          return NextResponse.json({ success: true, data: defaultAttendances, message: 'No data available yet for this day' });
    }
    return NextResponse.json({ success: true, data: existingAttendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ success: false, message: 'An error occurred' });
  }
}
