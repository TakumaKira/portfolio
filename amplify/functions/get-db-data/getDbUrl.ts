// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

interface DbCredentials {
  username: string;
  password: string;
}

export async function getDbUrl(): Promise<string> {
  try {
    const region = process.env.REGION;
    const dbSecretName = process.env.DB_SECRETS_NAME;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const database = process.env.DB_NAME;
    if (!region || !dbSecretName || !host || !port || !database) {
      throw new Error(`Missing environment variables: ${JSON.stringify({
        awsRegion: region,
        dbSecretName,
        host,
        port,
        database,
      })}`);
    }
  
    const client = new SecretsManagerClient({
      region,
    });
    
    console.log('Getting secret from AWS Secrets Manager');
    // This operation could cause a timeout when this Lambda function is placed in a VPC but not configured to get access to Secrets Manager(e.g. via a VPC endpoint)
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: dbSecretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
    console.log('Secret retrieved from AWS Secrets Manager');

    if (!response.SecretString) {
      throw new Error('Secret string is empty');
    }

    const credentials: DbCredentials = JSON.parse(response.SecretString);
    
    // Percent encode only the password to satisfy the RFC 3986 specification (Prisma requires this)
    const encodePassword = (password: string) => {
      return encodeURIComponent(password)
        // encodeURIComponent doesn't encode these characters
        .replace(/\*/g, '%2A')
        .replace(/\)/g, '%29')
        .replace(/\(/g, '%28')
        .replace(/!/g, '%21')
        .replace(/'/g, '%27');
    };
    
    // Construct the database URL with fully encoded password
    const dbUrl = `postgresql://${credentials.username}:${encodePassword(credentials.password)}@${host}:${port}/${database}`;
    
    return dbUrl;
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
}