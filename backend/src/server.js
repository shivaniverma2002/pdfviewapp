// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // ✅ Use your db.js file
import standardRoutes from "./routes/standardTemplateRoutes.js";
import euRoutes from "./routes/euTemplateRoutes.js";
import spreadsheetRoutes from "./routes/spreadsheetTemplateRoutes.js";

dotenv.config(); // ✅ load .env first
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ API Routes
app.use("/api/templates/standard", standardRoutes);
app.use("/api/templates/eu", euRoutes);
app.use("/api/templates/spreadsheet", spreadsheetRoutes);

// ✅ Root Test Route
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
