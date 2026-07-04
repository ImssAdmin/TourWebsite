import { users, SECRET_KEY } from './_lib/auth';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log(`User ${username} logged in with role ${user.role}`);

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    // Set cookie
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);

    return res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
