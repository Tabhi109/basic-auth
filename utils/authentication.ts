// pages/api/utils/authentication.ts
import { sql } from '@vercel/postgres';
import { NextApiRequest } from 'next';

export async function authenticate(req: NextApiRequest) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');

    if (!sessionToken) {
      throw new Error('Missing session token');
    }
    const { rows } = await sql`
      SELECT blinkit_users.id, blinkit_users.username
      FROM login_sessions
      JOIN blinkit_users ON login_sessions.user_id = blinkit_users.id
      WHERE session_token = ${sessionToken}`;

    if (rows.length === 0) {
      throw new Error('Invalid session token');
    }
    return { user: { id: rows[0].id, username: rows[0].username } };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
}
