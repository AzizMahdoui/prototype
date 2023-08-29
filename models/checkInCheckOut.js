
import mongoose from 'mongoose';

const checkInOutSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
});

export default mongoose.models.Shift|| mongoose.model('Shift', checkInOutSchema);

