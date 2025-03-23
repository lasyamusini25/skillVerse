import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import {jwtDecode} from "jwt-decode"; // Import JWT decoder

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    education: "",
    projects: [],
    skills: "",
  });

  const [userId, setUserId] = useState(null);

  // 🔹 Extract userId from JWT in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // 🔹 Debugging
        if (decoded.id) { // ✅ Use `id` instead of `userId`
          setUserId(decoded.id);
          console.log("User ID Set:", decoded.id);
        } else {
          console.error("User ID not found in token!");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);
  
  
  

  // 🔹 Fetch user profile
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4000/api/profile/${userId}`)
        .then((res) => {
          if (res.data) {
            setProfile({
              name: res.data.name || "",
              email: res.data.email || "",
              education: res.data.education || "",
              projects: Array.isArray(res.data.projects) ? res.data.projects : [],
              skills: res.data.skills ? res.data.skills.join(", ") : "",
            });
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]); // Fetch data when userId changes

  // 🔹 Handle input changes
  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  // 🔹 Add new project
  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { title: "", description: "", link: "" }],
    });
  };

  // 🔹 Handle project input changes
  const handleProjectChange = (e, index) => {
    const newProjects = [...profile.projects];
    newProjects[index][e.target.name] = e.target.value;
    setProfile({ ...profile, projects: newProjects });
  };

  // 🔹 Save updated profile
  const saveProfile = () => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
  
    axios.post("http://localhost:4000/api/profile/update", {
      userId, // Ensure userId is included in the request
      name: profile.name,
      email: profile.email,
      education: profile.education,
      projects: profile.projects.filter(p => p.title || p.description || p.link),
      skills: profile.skills.split(", ").map(skill => skill.trim()),
    })
    .then(() => alert("Profile Updated"))
    .catch((err) => console.error("Error updating profile:", err));
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <input className="block w-full p-2 border rounded mb-2" placeholder="Name" value={profile.name} onChange={(e) => handleChange(e, "name")} />
      <input className="block w-full p-2 border rounded mb-4" placeholder="Email" value={profile.email} onChange={(e) => handleChange(e, "email")} />

      <h3 className="text-lg font-bold mb-2">Education</h3>
      <input placeholder="Enter your education" value={profile.education} onChange={(e) => handleChange(e, "education")} className="block w-full p-2 border rounded" />

      <h3 className="text-lg font-bold mb-2 mt-4 flex items-center">Projects</h3>
      {profile.projects.length > 0 ? (
        profile.projects.map((proj, index) => (
          <div key={index} className="border p-3 rounded mb-2">
            <input name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(e, index)} className="block w-full p-2 border rounded" />
            <input name="description" placeholder="Description" value={proj.description} onChange={(e) => handleProjectChange(e, index)} className="block w-full p-2 border rounded mt-2" />
            <input name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleProjectChange(e, index)} className="block w-full p-2 border rounded mt-2" />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No projects added yet.</p>
      )}
      <button onClick={addProject} className="flex items-center gap-2 text-blue-600 mt-2">
        <PlusCircle className="w-5 h-5" /> Add Project
      </button>

      <h3 className="text-lg font-bold mt-4">Skills</h3>
      <input className="block w-full p-2 border rounded mt-2" placeholder="Enter skills separated by commas" value={profile.skills} onChange={(e) => handleChange(e, "skills")} />

      <button onClick={saveProfile} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full">Save</button>
    </div>
  );
};

export default ProfilePage;
