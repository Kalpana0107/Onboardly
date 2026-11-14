const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const uploadRoutes = require("./routes/upload");
const extractRoutes = require("./routes/extract");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const candidateRoutes = require("./routes/candidates");
const healthRoute = require("./routes/health");
const matchRoute = require("./routes/match");
const hrRoutes = require("./routes/hrRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const chatRoutes = require("./routes/chatRoutes");
const ragRoutes = require("./routes/ragRoutes");

require("dotenv").config();

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
}
if (!fs.existsSync('./db')) {
  fs.mkdirSync('./db', { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Supported Origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://onboardly-seven.vercel.app',
  'https://smart-hire-eight-rho.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isVercel = origin.endsWith('.vercel.app') || origin.includes('vercel');
    const isExplicit = allowedOrigins.includes(origin) || (process.env.CLIENT_URL && origin === process.env.CLIENT_URL);
    if (isExplicit || isVercel) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Normalize any duplicate /api prefixes (e.g. /api/api/candidates -> /api/candidates)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/api/')) {
    req.url = req.url.replace('/api/api/', '/api/');
  }
  next();
});

const db = require("./db/database");

// Mount routes on /api prefix
app.use("/api", healthRoute);
app.use("/api", uploadRoutes);
app.use("/api", extractRoutes);
app.use("/api", candidateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", matchRoute);
app.use("/api", authRoutes);
app.use("/api", hrRoutes);
app.use("/api", checklistRoutes);
app.use("/api", chatRoutes);
app.use("/api", ragRoutes);

// Also mount on root prefix for flexible client compatibility
app.use("/", healthRoute);
app.use("/", uploadRoutes);
app.use("/", extractRoutes);
app.use("/", candidateRoutes);
app.use("/", matchRoute);
app.use("/", authRoutes);
app.use("/", hrRoutes);
app.use("/", checklistRoutes);
app.use("/", chatRoutes);
app.use("/", ragRoutes);

app.use((err, req, res, next) => {
  console.error("unhandled error:", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack
    })
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
