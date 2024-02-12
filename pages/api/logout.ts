// pages/api/logout.js
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { sessionToken } = req.body;
  const result = await sql`
  DELETE 
  FROM 
  login_sessions 
  WHERE 
  session_token = ${sessionToken}
  RETURNING id
  `
    if(result.rowCount > 0)
    {
        return res.status(200).json({ success:true,message:"Log Out Successfully"})
    }
    else 
    {
        return res.status(401).json({ success:false,message:"Unauthorized"})
    }
}



