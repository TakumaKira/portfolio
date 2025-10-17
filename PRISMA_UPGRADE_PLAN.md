# Prisma 6 Upgrade Plan

## Context

AWS Amplify updated the default Node.js version from 18 to 20/22 between May and October 2025. This caused the build to fail with error: "Cannot find module '/node_modules/@prisma/client/runtime/query_engine_bg.postgresql.wasm-base64.js'" when running `npx prisma generate`.

## Root Cause

- Prisma 5.22.0 was designed before Node 20/22 became LTS
- The `prisma` CLI was not specified in `prisma/package.json`, causing `npx` to download it on-the-fly
- Downloaded CLI version may not match `@prisma/client@5.22.0`, causing binary/engine mismatches
- Old binary target `rhel-openssl-1.0.x` is incompatible with Node 20/22 on AWS Lambda

## Solution

Upgrade to Prisma 6 with proper Node 20/22 support and add the CLI as a devDependency.

## Breaking Changes Assessment

✅ **Safe to upgrade - no breaking changes in our codebase:**

- TypeScript 5.6.3 exceeds minimum 5.1.0
- No `Buffer` usage (no `Bytes` type fields)
- No `findUniqueOrThrow` or `findFirstOrThrow` usage
- No `NotFoundError` imports
- Simple schema with no many-to-many relations
- No preview features in use
- No problematic model names (`async`, `await`, `using`)

⚠️ **Changes required:**

1. Update binary target for Lambda Node 20/22 compatibility
2. Add `prisma` CLI to devDependencies
3. Remove redundant `npx prisma` commands
4. Configure Lambda environment variables in Amplify function definition
5. Add VPC configuration and IAM policies via CDK escape hatch

## Changes to Make

### 1. prisma/package.json

```diff
   "dependencies": {
-    "@prisma/client": "^5.22.0"
+    "@prisma/client": "^6.0.0"
+  },
+  "devDependencies": {
+    "prisma": "^6.0.0"
   }
```

**Rationale:**
- Ensures CLI and client versions match (prevents binary mismatches)
- Deterministic builds with `npm ci` (no runtime downloads)
- Faster builds (no npx downloads)
- Better security (no risk of compromised versions)

### 2. prisma/prisma/schema.prisma

```diff
 generator client {
   provider = "prisma-client-js"
-  binaryTargets = ["native", "rhel-openssl-3.0.x"]
+  binaryTargets = ["native", "rhel-openssl-3.0.x"]
 }
```

**Rationale:**
- `rhel-openssl-1.0.x` is deprecated and incompatible with Node 20/22
- AWS Lambda with Node 20/22 uses OpenSSL 3.0
- `native` is for local development

### 3. amplify.yml (2 locations)

**Backend (line 10):**
```diff
         - cd prisma
         - npm ci --cache .npm --prefer-offline
-        - npx prisma && npx prisma generate
+        - npx prisma generate
         - cd ..
```

**Frontend (line 26):**
```diff
         # Generate prisma client
         - cd prisma
         - npm ci --cache .npm --prefer-offline
-        - npx prisma && npx prisma generate
+        - npx prisma generate
         - cd ..
```

**Rationale:**
- `npx prisma` without arguments just prints help text (redundant)
- `npx prisma generate` is the only command needed

### 4. amplify/functions/get-db-data/resource.ts

```diff
 import { defineFunction } from '@aws-amplify/backend';

 const prismaLambdaLayerArn = process.env.PRISMA_LAMBDA_LAYER_ARN
 if (!prismaLambdaLayerArn) {
   throw new Error("PRISMA_LAMBDA_LAYER_ARN is not set")
 }

 export const getDbData = defineFunction({
   name: 'get-db-data',
   layers: {
     "portfolio-prisma": prismaLambdaLayerArn
   },
+  environment: {
+    REGION: process.env.AWS_REGION || '',
+    DB_SECRETS_NAME: process.env.DB_SECRETS_NAME || '',
+    DB_HOST: process.env.DB_HOST || '',
+    DB_PORT: process.env.DB_PORT || '',
+    DB_NAME: process.env.DB_NAME || '',
+    PRISMA_QUERY_ENGINE_LIBRARY: '/opt/nodejs/node_modules/portfolio-prisma/node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
+  },
+  timeoutSeconds: 30,
+  memoryMB: 512,
 })
```

**Rationale:**
- Environment variables from Amplify Console must be explicitly passed to Lambda via `environment` property
- `PRISMA_QUERY_ENGINE_LIBRARY` is hardcoded (stable path, only changes with Prisma major updates)
- Database connection settings are configurable via Amplify Console
- Increased timeout from default 3s to 30s for database operations
- Increased memory from default 128MB to 512MB for better performance

### 5. amplify/backend.ts

```diff
 import { defineBackend } from '@aws-amplify/backend';
 import { getDbData } from './functions/get-db-data/resource';
 import { auth } from './auth/resource';
 import { data } from './data/resource';
+import * as iam from 'aws-cdk-lib/aws-iam';

-/**
- * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
- */
-defineBackend({
+const backend = defineBackend({
   getDbData,
   auth,
   data,
 });
+
+// Configure VPC settings for Lambda function
+const subnetIds = process.env.VPC_SUBNET_IDS?.split(',') || [];
+const securityGroupIds = process.env.VPC_SECURITY_GROUP_IDS?.split(',') || [];
+
+if (subnetIds.length > 0 && securityGroupIds.length > 0) {
+  // Add VPC execution role
+  backend.getDbData.resources.lambda.role?.addManagedPolicy(
+    iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole')
+  );
+
+  // Add Secrets Manager access policy
+  backend.getDbData.resources.lambda.role?.addToPolicy(
+    new iam.PolicyStatement({
+      effect: iam.Effect.ALLOW,
+      actions: ['secretsmanager:GetSecretValue'],
+      resources: [`arn:aws:secretsmanager:${process.env.AWS_REGION}:*:secret:${process.env.DB_SECRETS_NAME}*`],
+    })
+  );
+
+  // Configure VPC settings via CFN resource
+  backend.getDbData.resources.cfnResources.cfnFunction.vpcConfig = {
+    subnetIds,
+    securityGroupIds,
+  };
+}
```

**Rationale:**
- Uses CDK escape hatch to configure VPC (workaround until Amplify adds native support)
- Automatically adds VPC execution role for Lambda
- Grants Secrets Manager access permissions
- Eliminates manual Lambda configuration after each deployment

## Implementation Steps

### Phase 1: Upgrade Prisma and Node Version
1. [ ] Update `prisma/package.json` with new versions and CLI dependency
2. [ ] Update `prisma/prisma/schema.prisma` binary target (already correct)
3. [ ] Update `amplify.yml` to remove redundant commands
4. [ ] Run `npm install` in `prisma/` directory locally
5. [ ] Run `npx prisma generate` locally to verify
6. [ ] Test locally with Node 20/22
7. [ ] Commit changes
8. [ ] Deploy to Amplify and verify build succeeds

### Phase 2: Automate Lambda Configuration (Eliminate Manual Setup)
9. [ ] Update `amplify/functions/get-db-data/resource.ts` to configure Lambda environment variables
10. [ ] Update `amplify/backend.ts` to add VPC configuration and IAM policies
11. [ ] Set environment variables in Amplify Console (one-time setup):
    - Navigate to: Amplify Console → App Settings → Environment Variables
    - Add the following variables:
      - `PRISMA_LAMBDA_LAYER_ARN`: arn:aws:lambda:\<region\>:\<account\>:layer:portfolio-prisma:\<version\>
      - `DB_SECRETS_NAME`: \<your-secrets-manager-secret-name\>
      - `DB_HOST`: \<your-rds-endpoint\>
      - `DB_PORT`: 5432
      - `DB_NAME`: portfolio
      - `VPC_SUBNET_IDS`: \<subnet-id-1\>,\<subnet-id-2\>
      - `VPC_SECURITY_GROUP_IDS`: \<security-group-id\>
    - Note: `AWS_REGION` is automatically available in Amplify build environment
    - Note: `PRISMA_QUERY_ENGINE_LIBRARY` is hardcoded in the function definition
    - These will be passed to Lambda via the function definition
12. [ ] Commit changes
13. [ ] Deploy to Amplify and verify build succeeds (no manual Lambda config needed!)

## Post-Upgrade Verification

- [ ] Amplify build completes successfully
- [ ] No WASM module errors
- [ ] Lambda functions work correctly
- [ ] Database queries execute as expected
- [ ] Check for any deprecation warnings in build logs

## Rollback Plan

If issues occur:
1. Revert commits
2. Temporarily pin Node.js version in Amplify: `nvm use 18`
3. Investigate specific issue before re-attempting upgrade

## References

- [Prisma 6 Upgrade Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6)
- [AWS Lambda Node.js Runtime Support](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
- [Amplify Build Optimization](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)
