// pages/api/logIn.ts
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { username, password } = req.body;

  const {rows} = await sql`
  SELECT 
  id 
  FROM 
  blinkit_users 
  WHERE 
  username = ${username} 
  AND 
  password = ${password}`;
  const id = rows[0].id
  if (rows[0].id) {
    const sessionToken = uuidv4();
    const { rows } = await sql `
    INSERT 
    INTO 
    login_Sessions (user_id,session_token) 
    VALUES 
    (
    ${id},
    ${sessionToken}
    )
    RETURNING id`;
    if(rows[0].id){
        return res.status(200).json({ success: true, sessionToken });
    }
  } else {
    return res.status(401).json({ message:"Unauthorized" });
  }
}
