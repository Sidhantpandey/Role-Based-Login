import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, password, role });
    res.status(201).json({
      message: "User registered",
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res
      .status(200)
      .json({ message: "Login successful", token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// frontend implementation 

// const res = await fetch("/api/auth/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email, password }),
// });

// const data = await res.json();
// const token = data.token;

// // decode the token and get role 
// const decoded = JSON.parse(atob(token.split(".")[1]));
// const role = decoded.role;

// // store token
// localStorage.setItem("token", token);

// // navigate to role-based dashboard
// if (role === "admin") navigate("/admin-dashboard");
// else if (role === "pump_operator") navigate("/operator-dashboard");
// else if (role === "panchayat") navigate("/panchayat-dashboard");
