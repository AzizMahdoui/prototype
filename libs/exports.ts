import mongoose from 'mongoose';

export interface Shift {
  date: Date;
  startTime: string;
  endTime: string;
}

export interface Employee extends mongoose.Document {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  employeeId: string;
  qrCode: string;
  phoneNumber: string;
  avatar?: string;
  position: string;
  shifts: Shift[];
}
export interface DailyDetail extends mongoose.Document {
    employeeId: mongoose.Types.ObjectId;
    date: Date;
    shift: mongoose.Types.ObjectId[];
    status: 'pending' | 'checked-in' | 'checked-out';
  }