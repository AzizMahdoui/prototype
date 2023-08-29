import { NextRequest, NextResponse } from "next/server";
import DailyDetails from "../../../models/dailyDetails";
import Shift from "../../../models/checkInCheckOut";
import Employee from "../../../models/employee";

interface AttendanceAlert {
  date: Date;
  shift_id:String,
  id: string;
  status: "checked-out";
}

export async function POST(req: NextRequest) {
  try {
    const { date,shift_id, id, status }: AttendanceAlert = await req.json();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const employeeDailyStatus = await DailyDetails.findOne({ employeeId: id, date: { $gte: startOfDay, $lt: endOfDay } })


    if (!employeeDailyStatus) {
      return NextResponse.json({
        message:
          "There is no Employee with this Id or The date of the shift is not set up yet",
      });
    }

    if (employeeDailyStatus.status==="pending") {

        return NextResponse.json({
           success:false, message: "You have to Checkin First",
          });
    
    
    //   if (!checkOutShift) {
    //     return NextResponse.json({
    //       message: "No shift found for check-out",
    //     });
      }
      const checkOutShift = await Shift.findById(shift_id);

      checkOutShift.checkOut = new Date();
      employeeDailyStatus.status = "checked-out";
      await checkOutShift.save();
      await employeeDailyStatus.save()

    //   // Update the daily details status
    //   employeeDailyStatus.status = "checked-out";
    //   await employeeDailyStatus.save();

    //   // Update the employee's shifts history
    //   const employee = await Employee.findOne({ _id: id });

    //   const shiftIndexToUpdate = employee.shiftsHistory.findIndex(
    //     (shiftId) => shiftId.toString() === checkOutShift._id.toString()
    //   );

    //   if (shiftIndexToUpdate !== -1) {
    //     employee.shiftsHistory[shiftIndexToUpdate] = checkOutShift._id;
    //     await employee.save();
    //   }

    //   return NextResponse.json({
    //     success: true,
    //     data: employee,
    //     message: "Employee has been checked out successfully",
    //   });
    // }

    return NextResponse.json({ success: true, data: employeeDailyStatus, message: 'Employee have been checked out successfully' });

  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
