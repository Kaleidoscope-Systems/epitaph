import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const societyResponse = await prisma.society.findUniqueOrThrow({
            where: {
                id: 1,
            },
        },
        );
        res.status(200).json(societyResponse);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch society data'})
    }
}