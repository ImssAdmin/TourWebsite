import { authenticate, authorize } from './_lib/auth.js';
import { supabaseAdmin } from './_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth checks
  const user = authenticate(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!authorize(user, ["Super Admin", "Admin"])) {
    return res.status(403).json({ error: "Insufficient permissions to delete images" });
  }

  try {
    const { path } = req.body;

    if (!path) {
      return res.status(400).json({ error: 'No file path provided' });
    }

    // Delete from Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('website-images')
      .remove([path]);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ error: 'Failed to delete from storage', details: error.message });
    }

    console.log(`Image deleted successfully by ${user.username}: ${path}`);

    return res.status(200).json({ 
      success: true, 
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Internal server error during deletion' });
  }
}
