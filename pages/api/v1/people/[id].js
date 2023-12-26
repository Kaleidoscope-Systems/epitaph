import prisma from "@/lib/prisma";
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
  console.log('req.method:', req.method)
  if (req.method === 'PATCH' && session && caps.editPeople) {
    console.log('req.body:', req.body)
    try {
      const id = req.query.id;
      const data = JSON.parse(req.body);
      console.log('id:', id)
      console.log('data:', data)
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