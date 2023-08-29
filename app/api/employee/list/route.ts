import { NextResponse, NextRequest } from 'next/server';
import Employee from '../../../../models/employee';
import dbConnect from '../../../../libs/db';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const employees = await Employee.find()
    const responseBody = JSON.stringify(employees);

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
