import { useNavigate } from 'react-router-dom';

const Earnly = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Choose Your Login</h1>
            <button 
                onClick={() => navigate("/login")}  
                className="bg-blue-500 text-white px-6 py-2 rounded mb-2"
            >
                Student Login
            </button>
            <button 
                onClick={() => navigate("/admin/login")}  
                className="bg-green-500 text-white px-6 py-2 rounded"
            >
                Client Login
            </button>
        </div>
    );
};

export default Earnly;  // ✅ Ensure this line is present
