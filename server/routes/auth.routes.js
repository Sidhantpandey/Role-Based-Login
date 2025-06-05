import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { protect, allowRoles } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example protected routes:
router.get("/admin-only", protect, allowRoles("admin"), (req, res) => {
  res.send("Welcome Admin!");
});

router.get("/operator-view", protect, allowRoles("pump_operator"), (req, res) => {
  res.send("Welcome Pump Operator!");
});

router.get("/panchayat-view", protect, allowRoles("panchayat"), (req, res) => {
  res.send("Panchayat Dashboard");
});

export default router;
