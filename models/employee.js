import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import shift from "./checkInCheckOut"

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: false,
  },
  password: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  qrCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: true,
  },
 
});

employeeSchema.pre("save", async function (next) {
  const employee = this;

  if (!employee.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(employee.password, salt);
    employee.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
