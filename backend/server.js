const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const uploadRoutes = require("./routes/upload");
const extractRoutes = require("./routes/extract");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); const candidateRoutes = require("./routes/candidates");

require("dotenv").config({ path: "./.env" });

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
    origin: [
        'http://localhost:5173',
        'https://smart-hire-eight-rho.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());





const healthRoute = require("./routes/health");

const matchRoute = require("./routes/match");

const db = require("./db/database");

app.use("/api", healthRoute);
app.use("/api", uploadRoutes);
app.use("/api", extractRoutes);
app.use("/api", candidateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", matchRoute);


app.use((err, req, res, next) => {
    console.error("unhandled error:", err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack

        })
    })
});
app.get("/test", (req, res) => {
    res.send("Working");
});
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
})
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });