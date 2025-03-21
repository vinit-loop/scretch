import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../modals/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "vinit";

export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const profile = req.file ? `/uploads/${req.file.filename}` : null;

    if (!profile) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, profile, role });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is in your .env file
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Error in user registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
