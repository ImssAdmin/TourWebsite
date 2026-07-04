import { authenticate, authorize } from './_lib/auth.js';
import prisma from './_lib/prisma.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get the latest custom data
      const customDataRecord = await prisma.customData.findFirst({
        orderBy: { updatedAt: 'desc' }
      });

      if (customDataRecord && customDataRecord.data) {
        return res.status(200).json(customDataRecord.data);
      } else {
        return res.status(200).json({});
      }
    } catch (error) {
      console.error("Failed to read data:", error);
      return res.status(500).json({ error: "Failed to read data" });
    }
  }

  if (req.method === 'POST') {
    // Auth checks
    const user = authenticate(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (!authorize(user, ["Super Admin", "Admin", "Editor"])) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    try {
      console.log(`Audit log: Data updated by ${user.username} (${user.role})`);
      const data = req.body;

      // Update or create the custom data record
      // Using findFirst since we just want a single document store
      const existingRecord = await prisma.customData.findFirst();

      if (existingRecord) {
        await prisma.customData.update({
          where: { id: existingRecord.id },
          data: { data: data }
        });
      } else {
        await prisma.customData.create({
          data: { data: data }
        });
      }

      return res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Failed to save data:", error);
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
