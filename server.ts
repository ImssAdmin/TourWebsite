import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const SECRET_KEY = "SUPER_SECRET_KEY_NEVER_HARDCODE"; // In real app use process.env.JWT_SECRET

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Role hierarchy and permissions
const ROLE_PERMISSIONS = {
  "Super Admin": ["read", "write", "delete", "manage_users"],
  "Admin": ["read", "write", "delete"],
  "Editor": ["read", "write"],
  "Manager": ["read", "approve"],
  "Viewer": ["read"]
};

// Mock users database
const users = [
  { username: "superadmin", password: "password", role: "Super Admin" },
  { username: "admin", password: "password", role: "Admin" },
  { username: "editor", password: "password", role: "Editor" },
  { username: "manager", password: "password", role: "Manager" },
  { username: "viewer", password: "password", role: "Viewer" }
];

const DATA_FILE = path.join(process.cwd(), "data.json");

// Middleware to authenticate JWT
// @ts-ignore
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  // @ts-ignore
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    // @ts-ignore
    req.user = user;
    next();
  });
};

// @ts-ignore
const authorizeRoles = (...roles) => {
  // @ts-ignore
  return (req, res, next) => {
    // @ts-ignore
    if (!req.user || !roles.includes(req.user.role)) {
      // @ts-ignore
      console.log(`User role ${req.user?.role} not in allowed: ${roles}`);
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};

// --- API ROUTES ---

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  console.log(`User ${username} logged in with role ${user.role}`);

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie("admin_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Login successful", role: user.role });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ message: "Logged out" });
});

// @ts-ignore
app.get("/api/me", authenticateJWT, (req, res) => {
  // @ts-ignore
  res.json({ user: req.user });
});

// Load custom data
app.get("/api/data", (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      res.json(JSON.parse(data));
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// Save custom data - only accessible by roles with write access
// @ts-ignore
app.post("/api/data", authenticateJWT, authorizeRoles("Super Admin", "Admin", "Editor"), (req, res) => {
  try {
    // @ts-ignore
    console.log(`Audit log: Data updated by ${req.user.username} (${req.user.role})`);
    const data = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Admin config endpoint (sensitive configuration hidden from public)
// @ts-ignore
app.get("/api/admin-config", authenticateJWT, authorizeRoles("Super Admin", "Admin"), (req, res) => {
  res.json({
    secretApiKey: process.env.SECRET_API_KEY || "fake-api-key-for-test",
    serverLogs: ["System booted", "DB connected"],
    // @ts-ignore
    permissions: ROLE_PERMISSIONS[req.user.role]
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static file serving for production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
