import prisma from './_lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, message } = req.body;
    
    await prisma.contact.create({
      data: {
        name: name || "Unknown",
        phone: phone || "Unknown",
        email: email,
        service: service,
        message: message,
      }
    });

    return res.status(200).json({ message: "Message submitted successfully", success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({ error: "Failed to submit message", success: false });
  }
}
