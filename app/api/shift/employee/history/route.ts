import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../../../libs/db';
import shift from '../../../../../models/checkInCheckOut'
export interface Payload{
    employeeId:String,
    date:Date,
}
export async function POST(req: NextRequest) {
  await dbConnect();
    const payload:Payload = await req.json() 
  try {
    const shifts = await shift.find({employeeId:payload.employeeId}).populate('Employee')
    const responseBody = JSON.stringify(shifts);

    return new NextResponse(responseBody, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(responseBody, 'utf-8'),
      },
    });
  } catch (err) {
    return new NextResponse({ error: 'Server Error' }, { status: 500 });
  }
}
