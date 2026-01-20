const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://imadsfirstloginpage.netlify.app",
    ],
  }),
);
app.use(express.json());

const users = []; // In-memory user storage - replace with database in the future

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).send("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
