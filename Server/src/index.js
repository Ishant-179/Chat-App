import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


const allowedOrigins = [
  "https://chat-app-gk96.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or same-origin
    const normalizedOrigin = origin.replace(/\/$/, ""); // remove trailing slash
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});