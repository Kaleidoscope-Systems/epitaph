import pg from 'pg';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";

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
  if (session && caps.viewPeople) {
    const { Client } = pg
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect()
    
    const sql = `
      SELECT p.*
      FROM "people" p
    `;

    try {
      const peopleResponse = await client.query(sql);
      const people = peopleResponse.rows;
      res.status(200).json(people);
    } catch (error) {
      // Log the error for internal debugging
      console.error("Error fetching people:", error);

      // Send a user-friendly error message
      res.status(500).json({ message: 'Error fetching data from the database' });
    } finally {
      try {
        await client.end(); // Ensure the connection is properly closed
      } catch (disconnectionError) {
        console.error("Error disconnecting from the database:", disconnectionError);
      }
    }
    /* try {
      //TODO: paginate results
      const peopleResponse = await prisma.people.findMany({
        include: { executor: true },
      });
      res.status(200).json(peopleResponse);
    } catch (error) {
      res.status(500).json(error)
    } */
  }
  if (session && !caps.viewPeople) {
    res.status(403).json({error: 'User does not have permission to view people.'})
  }
  if (!session) {
    res.status(401).json({error: 'You must first authenticate.'})
  }  
}