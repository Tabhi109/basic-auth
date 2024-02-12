// pages/api/upload.ts
import { authenticate } from '@/utils/authentication';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = await authenticate(req);

    if (!req.body || !req.body.image) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const imageBase64 = req.body.image;

    const { rows } = await sql`
      INSERT INTO blinkit_images (image_base64, user_id)
      VALUES (${imageBase64}, ${user.id})
      RETURNING id`;

    return res.status(200).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
