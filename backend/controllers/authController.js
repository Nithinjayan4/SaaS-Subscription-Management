import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = awaitUser.create({ name, email, password: hashPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "User creation failed", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
    expiresIn: "7d",
  });
};
