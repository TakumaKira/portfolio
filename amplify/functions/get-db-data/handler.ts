import { PrismaClient } from 'portfolio-prisma';
import { getDbUrl } from './getDbUrl';

export const handler = async (event: any) => {
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
    
    // Use prisma client as normal
    const configs = await prisma.config.findMany();
    prisma.$disconnect();

    return {
      statusCode: 200,
      body: JSON.stringify(configs),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};