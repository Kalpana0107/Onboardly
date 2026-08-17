const uploadRoutes = require("./routes/upload");
const extractRoutes = require("./routes/extract");

const express = require("express");
const cors = require("cors");

const candidateRoutes = require("./routes/candidates");

require("dotenv").config();

const fs = require('fs')
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true })
}
if (!fs.existsSync('./db')) {
  fs.mkdirSync('./db', { recursive: true })
}

const app = express();

const PORT = process.env.PORT || 3000;



app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://smart-hire-eight-rho.vercel.app'
    ];
    const isVercel = origin.endsWith('.vercel.app') || origin.includes('vercel');
    if (allowedOrigins.indexOf(origin) !== -1 || isVercel) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());




const healthRoute = require("./routes/health");

const matchRoute = require("./routes/match");
const authRoutes = require("./routes/authRoutes");
const hrRoutes = require("./routes/hrRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const chatRoutes = require("./routes/chatRoutes");
const ragRoutes = require("./routes/ragRoutes");

const db = require("./db/database");

app.use("/api", healthRoute);
app.use("/api", uploadRoutes);
app.use("/api", extractRoutes);
app.use("/api", candidateRoutes);
app.use("/api", matchRoute);
app.use("/api", authRoutes);
app.use("/api", hrRoutes);
app.use("/api", checklistRoutes);
app.use("/api", chatRoutes);
app.use("/api", ragRoutes);


app.use((err, req, res, next) => {
    console.error("unhandled error:", err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack

        })
    })
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});
