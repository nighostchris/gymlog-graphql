import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);

export default User;
