import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
      const query = req.query;
      const { content } = query;
      const contentResponse = await prisma.content.findUniqueOrThrow({
        where: {
            commonName: content,
        },
      },
      );
      console.log(contentResponse);
      res.status(200).json(contentResponse);
    } catch (error) {
        res.status(500).json({error: 'API failed to fetch content'})
    }
}