    
import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 30, // Use maxPoolSize instead of poolSize
      });
      

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

export default dbConnect;
