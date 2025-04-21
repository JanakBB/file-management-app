import express from "express";
import { writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with {type: "json"};
import usersData from "../usersDB.json" with {type: "json"};

const router = express.Router();

// Register
router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const foundUser = usersData.find((user) => user.email === email);
  if (foundUser) {
    return res.status(409).json({
      error: "User already exists.",
      message: "A user with this email address already exists.",
    });
  }

  const dirId = crypto.randomUUID();
  const userId = crypto.randomUUID();

  // Crate a root directory for the user
  directoriesData.push({
    id: dirId,
    name: `root-${email}`,
    userId,
    parentDirId: null,
    files: [],
    directories: [],
  });

  // Add user to usersDB
  usersData.push({
    id: userId,
    name,
    email,
    password, // Note: In production, hash the password!
    rootDirId: dirId,
  });

  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    await writeFile("./usersDB.json", JSON.stringify(usersData));
    res.status(201).json({ message: "User Registered." });
  } catch (err) {
    next(err);
  }
});

//Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const userWithEmail = usersData.find((u) => u.email === email);
  const userWithPassword = usersData.find((u) => u.password === password);
  const messageError = [];
  if (!userWithEmail) {
    res.status(401).json({
      error: "Invalid credentials.",
      message: "Email is incorrect.",
      reason: "email",
    });
  } else if (!userWithPassword) {
    return res.status(401).json({
      error: "Invalid credentials.",
      message: "Password is incorrect.",
      reason: "password",
    });
  }
  res.status(200).json({ message: "Login successful", userId: user.id });
});

export default router;
