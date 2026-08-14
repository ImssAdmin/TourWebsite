import { authenticate, authorize } from './_lib/auth.js';
import { supabaseAdmin } from './_lib/supabase.js';

export default async function handler(req, res) {
  // Set JSON content type for all responses
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth checks - only Admin, Super Admin, and Editor can upload
  const user = authenticate(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!authorize(user, ["Super Admin", "Admin", "Editor"])) {
    return res.status(403).json({ error: "Insufficient permissions to upload images" });
  }

  try {
    const { image, fileName } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const sanitizedFileName = fileName?.replace(/[^a-zA-Z0-9.-]/g, '_') || 'image';
    const uniqueFileName = `${timestamp}-${randomString}-${sanitizedFileName}`;
    const filePath = `uploads/${uniqueFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('website-images')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        upsert: false,
        cacheControl: '31536000' // Cache for 1 year
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload to storage', details: error.message });
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('website-images')
      .getPublicUrl(filePath);

    console.log(`Image uploaded successfully by ${user.username}: ${publicUrl}`);

    return res.status(200).json({
      success: true,
      url: publicUrl,
      path: filePath
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Internal server error during upload' });
  }
}
