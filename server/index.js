import express from "express";
import connectDB from "./database/database.js";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";

// connectDB();
const app = express();
const port = 4000;

app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
