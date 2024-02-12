// pages/api/signUp.ts
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { first_name,last_name,username, password,email } = req.body;
  const { rows } = await sql`
  INSERT 
  INTO 
  blinkit_users (first_name,last_name,email,username,password)
  VALUES
  (
    ${first_name},
    ${last_name},
    ${email},
    ${username},
    ${password}
   )
   RETURNING ID`;
   return res.status(200).json({id : rows[0].id})
}




