import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../../libs/db';
import shift from '../../../../models/checkInCheckOut'
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const shifts = await shift.find()
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
