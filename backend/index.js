import express from "express";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectToDB } from "./db/connectToDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
console.log(__dirname);
await connectToDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  // make frontend folder as static asset in production
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // all other routes (other than /api/auth) should be rendered by React
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("listening on prot:", PORT);
});
