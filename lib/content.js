import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchAboutUs() {
  try {
   const aboutUsText = await prisma.content.findUniqueOrThrow({
    where: {
      commonName: 'aboutUs',
    },
    });
    return aboutUsText; 
  } catch {
    const aboutUsText = "This burial society has not provided information for this page."
    return aboutUsText;
  }
  
}

export default fetchAboutUs