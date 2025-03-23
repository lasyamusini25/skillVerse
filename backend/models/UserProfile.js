import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Store userId properly
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: { type: String },
  projects: [
    {
      title: { type: String },
      description: { type: String },
      link: { type: String }
    }
  ],
  skills: [{ type: String }]
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
