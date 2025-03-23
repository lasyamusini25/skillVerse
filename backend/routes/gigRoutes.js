import express from 'express';
import mongoose from 'mongoose';
import Gig from '../models/Gig.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// 📌 1️⃣ **Create a Gig (Client)**
router.post('/add', authenticateToken, async (req, res) => {
    try {
        console.log("Received request at /add");
        console.log("Received Data:", req.body);
        console.log("req.user.id Type:", typeof req.user.id, req.user.id); // <-- Add this line

        const { title, description, skillsRequired, stipend, registrationDeadline, courseDuration } = req.body;

        if (!title || !description || !skillsRequired || !stipend || !registrationDeadline || !courseDuration) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newGig = new Gig({
            title,
            description,
            skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : skillsRequired.split(',').map(skill => skill.trim()), // Ensure it's always an array
            stipend,
            registrationDeadline,
            courseDuration,
            clientId: new mongoose.Types.ObjectId(req.user.id), // Ensure ObjectId format
        });
        

        await newGig.save();
        res.status(201).json({ success: true, message: "Gig created successfully", gig: newGig });

    } catch (error) {
        console.error("🔥 Server Error in /add route:", error); // More detailed logging
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


router.get('/list', async (req, res) => {
    try {
        const gigs = await Gig.find().populate("applicants", "name _id"); // ✅ Fetch names
        res.json({ success: true, gigs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

  

// 📌 3️⃣ **Apply for a Gig (Student)**
router.post('/apply/:gigId', authenticateToken, async (req, res) => {
    try {
        const { gigId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({ success: false, message: "Invalid Gig ID" });
        }

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ success: false, message: "Gig not found" });

        if (gig.applicants.includes(req.user.id)) {
            return res.status(400).json({ success: false, message: "Already applied for this gig" });
        }

        gig.applicants.push(req.user.id);
        await gig.save();
        res.json({ success: true, message: "Applied successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// 📌 4️⃣ **Approve/Reject Student for a Gig (Client)**
router.post('/update-status/:gigId', authenticateToken, async (req, res) => {
    try {
        const { gigId } = req.params;
        const { studentId, action } = req.body;

        console.log("📌 Received Gig ID:", gigId);
        console.log("📌 Received Student ID:", studentId);
        console.log("📌 Action:", action);
        console.log("📌 Requesting User:", req.user);

        // Validate ID formats
        if (!mongoose.Types.ObjectId.isValid(gigId) || !mongoose.Types.ObjectId.isValid(studentId)) {
            console.log("❌ Invalid ID format!");
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        // Fetch gig
        const gig = await Gig.findById(gigId);
        if (!gig) {
            console.log("❌ Gig Not Found!");
            return res.status(404).json({ success: false, message: "Gig not found" });
        }

        console.log("🔍 Gig Client ID (From DB):", gig.clientId.toString());
        console.log("🔍 Requesting User ID (From Token):", req.user.id);

        // Fix ID comparison issue
        if (gig.clientId.toString() !== req.user.id) {
            console.log("❌ Unauthorized: User is not the gig owner!");
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        // Handle approval or rejection
        if (action === 'approve') {
            if (!gig.selectedStudents.includes(studentId)) {
                gig.selectedStudents.push(studentId);
                gig.applicants = gig.applicants.filter(id => id.toString() !== studentId); // Remove from applicants
            } else {
                console.log("⚠️ Student already approved!");
            }
        } else if (action === 'reject') {
            gig.applicants = gig.applicants.filter(id => id.toString() !== studentId);
        } else {
            console.log("❌ Invalid action:", action);
            return res.status(400).json({ success: false, message: "Invalid action" });
        }

        await gig.save();
        console.log(`✅ Student ${action}d successfully!`);
        res.json({ success: true, message: `Student ${action}d successfully` });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


// 📌 5️⃣ **Mark Gig as Completed (Client)**
router.post('/complete/:gigId', authenticateToken, async (req, res) => {
    try {
        const { gigId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({ success: false, message: "Invalid Gig ID" });
        }

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ success: false, message: "Gig not found" });
        if (gig.clientId.toString() !== req.user.id) return res.status(403).json({ success: false, message: "Unauthorized" });

        gig.status = "Completed";
        await gig.save();
        res.json({ success: true, message: "Gig marked as completed" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});
// 📌 2️⃣ **Get Gig Details by ID**
router.get('/:gigId', async (req, res) => {
    try {
        const { gigId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({ success: false, message: "Invalid Gig ID" });
        }

        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ success: false, message: "Gig not found" });
        }

        res.json({ success: true, gig });

    } catch (error) {
        console.error("🔥 Error fetching gig details:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

router.get("/ongoing", async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("📌 Fetching ongoing gigs for organization:", userId);

        const gigs = await Gig.find({ clientId: userId }).populate("selectedStudents", "name email");

        if (!gigs.length) {
            return res.status(404).json({ success: false, message: "No ongoing gigs found" });
        }

        const ongoingGigs = gigs.map(gig => ({
            gigId: gig._id,
            title: gig.title,
            description: gig.description,
            approvedStudents: gig.selectedStudents.map(student => ({
                id: student._id,
                name: student.name,
                email: student.email
            }))
        })).filter(gig => gig.approvedStudents.length > 0);

        console.log("✅ Ongoing gigs:", ongoingGigs);
        res.json({ success: true, ongoingGigs });

    } catch (error) {
        console.error("🔥 Error fetching ongoing gigs:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});




export default router;
