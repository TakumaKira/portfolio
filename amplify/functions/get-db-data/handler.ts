import { PrismaClient } from 'portfolio-prisma';
import { getDbUrl } from './getDbUrl';
import type { Schema } from "../../data/resource"

export const handler: Schema["getDbData"]["functionHandler"] = async (event: any) => {
  let prisma: PrismaClient;
  try {
    const dbUrl = await getDbUrl();
    console.log('dbUrl', dbUrl);
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
    
    const configRaw = await prisma.config.findMany()
    const config = Object.fromEntries(configRaw.map(({ name, value }) => [name, value]))
    prisma.$disconnect();
    return { config }
  } catch (error) {
    throw new Error('Database error: ' + error);
  }
};
