import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchAboutUs() {
  try {
   const aboutUs = await prisma.content.findUniqueOrThrow({
    where: {
      commonName: 'aboutUs',
    },
    });
    return aboutUs.value; 
  } catch {
    const error = "This burial society has not provided information for this page."
    return error;
  }
  
}

export default fetchAboutUs