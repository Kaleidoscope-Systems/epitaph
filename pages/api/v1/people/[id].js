import prisma from "@/lib/prisma";
import pg from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";

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
      const updatePerson = await prisma.people.update({
        where: { id: id },
        data: data,
      });
      res.status(200).json(updatePerson);
    } catch (error) {
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