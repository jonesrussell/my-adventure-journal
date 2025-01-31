import mongoose from 'mongoose';
import { UserModel, IUser } from '@/models/User';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { email, hashedPassword } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && user.hashedPassword === hashedPassword) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 