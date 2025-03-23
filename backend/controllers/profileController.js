import UserProfile from "../models/UserProfile.js"; // ✅ Use ES Module import

// Get Profile by User ID
export const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { userId, name, email, education, projects, skills } = req.body;

  // 🔹 Validate userId
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // 🔹 Ensure `projects` and `skills` are arrays to prevent schema issues
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId }, // Find by userId
      {
        name,
        email,
        education,
        projects: Array.isArray(projects) ? projects : [],
        skills: Array.isArray(skills) ? skills : [],
      },
      { new: true, upsert: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error. Profile update failed." });
  }
};