import prisma from "@/lib/prisma";
import pg from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";
import { error } from "console";

async function findPersonById(id) {
  const { Client } = pg
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const sql = `
      SELECT *
      FROM people
      WHERE id = $1
    `;

    const values = [id];

    const result = await client.query(sql, values);

    if (result.rows.length === 0) {
      throw new Error('Person not found');
    }

    return result.rows[0];
  } finally {
    await client.end();
  }
}

async function updatePersonById(id, data) {
  const { Client } = pg
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    // Keep this up to date with columns used in the table
    const allowedColumns = ['givenName', 'familyName', 'email', 'phone', 'status', 'dateOfBirth'];

    // Create the SET clause and values array dynamically
    const setClause = [];
    const values = [id];
    let paramCount = 1;

    for (const [key, value] of Object.entries(data)) {
      if (allowedColumns.includes(key)) {
        setClause.push(`"${key}" = $${++paramCount}`);
        values.push(value);
      }
    }

    // If no valid fields to update, return early
    if (setClause.length === 0) {
      return error(400);
    }

    const sql = {
      text: `
        UPDATE people
        SET ${setClause.join(', ')}
        WHERE id = $1
        RETURNING *
      `,
      values: values
    };

    const result = await client.query(sql);

    if (result.rows.length === 0) {
      throw new Error('Person not found');
    }

    return result.rows[0];
  } finally {
    await client.end();
  }
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const caps = 
		session && session.user.caps
			? (() => {
					try {
						return session.user.caps;
					} catch (e) {
						console.error('Error getting user capabilities:', e);
						return {};
					}
				})()
			: {};
  console.log('req.method:', req.method)
  if (req.method === 'PATCH' && session && caps.editPeople) {
    try {
      const id = req.query.id;
      const data = JSON.parse(req.body);
      const updatePerson = updatePersonById(id, data);
      res.status(200).json(updatePerson);
    } catch (error) {
      if (error === 400){
        res.status(400).json({ error: 'No valid fields to update' });
      }
      res.status(500).json(error);
    }
  }
  if (req.method === 'GET' && session && caps.viewPeople) {
    try {
      const { id } = req.query;
      const person = await findPersonById(id);
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (req.method === 'PUT' && session && !caps.editPeople) {
    res.status(403).json({error: 'User does not have permission to edit people.'})
  }
  if (req.method === 'GET' && session && !caps.viewPeople) {
    res.status(403).json({error: 'User does not have permission to view people.'})
  }
  if (!session) {
    res.status(401).json({error: 'You must first authenticate.'})
  }  
}