import prisma from './_lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, message } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        error: "Name and phone are required fields",
        success: false
      });
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        service: service || "general",
        message: message?.trim() || null,
      }
    });

    console.log(`New contact submission from: ${name} (${phone})`);

    return res.status(200).json({
      message: "Message submitted successfully",
      success: true,
      contactId: contact.id
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({
      error: "Failed to submit message. Please try again later.",
      success: false
    });
  }
}
