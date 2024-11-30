import express from "express";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("hey");
});

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("listening on prot:", PORT);
});
