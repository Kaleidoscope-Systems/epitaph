import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";

const prisma = new PrismaClient();

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
    try {
      const { id } = req.query;
      const peopleResponse = await prisma.people.findUniqueOrThrow({
        where: {
          id: id,
        },
      },
      );
      res.status(200).json(peopleResponse);
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (session && !caps.viewPeople) {
    res.status(403).json({error: 'User does not have permission to view people.'})
  }
  if (!session) {
    res.status(401).json({error: 'You must first authenticate.'})
  }  
}