import { authenticate, authorize } from './_lib/auth';
import prisma from './_lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth checks
  const user = authenticate(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!authorize(user, ["Super Admin", "Admin", "Editor", "Manager"])) {
    return res.status(403).json({ error: "Insufficient permissions" });
  }

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return res.status(500).json({ error: "Failed to read contacts" });
  }
}
