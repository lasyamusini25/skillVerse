import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Briefcase, GraduationCap, Code, Mail } from "lucide-react";

const Display = () => {
  const { userId } = useParams(); // Get userId from URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/profile/${userId}`)
      .then((res) => {
        if (res.data) {
          setProfile({
            name: res.data.name || "No name provided",
            email: res.data.email || "No email provided",
            education: res.data.education || "No education details available",
            projects: Array.isArray(res.data.projects) ? res.data.projects : [],
            skills: res.data.skills ? res.data.skills.join(", ") : "No skills listed",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [userId]);

  if (!profile) {
    return <p className="text-center text-gray-600 mt-10">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
        <p className="text-gray-600 flex justify-center items-center gap-2 mt-1">
          <Mail className="w-5 h-5" /> {profile.email}
        </p>
      </div>

      {/* Education Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <GraduationCap className="w-5 h-5" /> Education
        </h3>
        <p className="text-gray-700 mt-1">{profile.education}</p>
      </div>

      {/* Projects Section */}
      {profile.projects.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Briefcase className="w-5 h-5" /> Projects
          </h3>
          <ul className="mt-2 space-y-3">
            {profile.projects.map((proj, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg">{proj.title}</h4>
                <p className="text-gray-700">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-blue-500 underline mt-1 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Code className="w-5 h-5" /> Skills
        </h3>
        <p className="text-gray-700 mt-1">{profile.skills}</p>
      </div>
    </div>
  );
};

export default Display;
