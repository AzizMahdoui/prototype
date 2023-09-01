
import mongoose from 'mongoose';

const dailyDetailsSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  shiftOfTheDay:{type:mongoose.Schema.Types.ObjectId,ref:"Shift",required:false},
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'checked-in', 'checked-out'], default: 'pending' },
});

export default mongoose.models.DailyDetails|| mongoose.model('DailyDetails', dailyDetailsSchema);

