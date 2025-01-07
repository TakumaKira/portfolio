import { getDbUrl } from './getDbUrl';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generatePrismaClient() {
  try {
    // Get the database URL from Secrets Manager
    const dbUrl = await getDbUrl();
    
    // Set the environment variable
    process.env.DATABASE_URL = dbUrl;
    console.log('Set process.env.DATABASE_URL:', process.env.DATABASE_URL);
    
    // Generate Prisma Client
    console.log('Generating Prisma Client...');
    await execAsync('npx prisma generate');
    
    console.log('Prisma Client generated successfully');
  } catch (error) {
    console.error('Error generating Prisma Client:', error);
    process.exit(1);
  }
}

generatePrismaClient(); 