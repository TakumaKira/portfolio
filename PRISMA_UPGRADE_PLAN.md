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

## Implementation Steps

1. [ ] Update `prisma/package.json` with new versions and CLI dependency
2. [ ] Update `prisma/prisma/schema.prisma` binary target
3. [ ] Update `amplify.yml` to remove redundant commands
4. [ ] Run `npm install` in `prisma/` directory locally
5. [ ] Run `npx prisma generate` locally to verify
6. [ ] Test locally with Node 20/22
7. [ ] Commit changes
8. [ ] Deploy to Amplify and verify build succeeds

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
