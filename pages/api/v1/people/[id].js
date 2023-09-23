import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
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