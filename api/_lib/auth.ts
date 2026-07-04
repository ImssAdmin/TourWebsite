import jwt from 'jsonwebtoken';

export const SECRET_KEY = process.env.JWT_SECRET || "SUPER_SECRET_KEY_NEVER_HARDCODE";

export const ROLE_PERMISSIONS = {
  "Super Admin": ["read", "write", "delete", "manage_users"],
  "Admin": ["read", "write", "delete"],
  "Editor": ["read", "write"],
  "Manager": ["read", "approve"],
  "Viewer": ["read"]
};

export const users = [
  { username: "superadmin", password: "password", role: "Super Admin" },
  { username: "admin", password: "password", role: "Admin" },
  { username: "editor", password: "password", role: "Editor" },
  { username: "manager", password: "password", role: "Manager" },
  { username: "viewer", password: "password", role: "Viewer" }
];

// Helper to extract cookies from Vercel Request
export const parseCookies = (request) => {
  const list = {};
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach((cookie) => {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
};

// Middleware equivalent for authenticating JWT
export const authenticate = (req) => {
  const cookies = parseCookies(req);
  const token = cookies.admin_token;
  
  if (!token) return null;
  
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

// Middleware equivalent for authorizing roles
export const authorize = (user, allowedRoles) => {
  if (!user || !allowedRoles.includes(user.role)) {
    return false;
  }
  return true;
};
