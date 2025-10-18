# Pull Request Draft

**Target Branch:** `topic/update-for-lambda-node-update`
**Source Branch:** `fix/update-prisma`
**Title:** Upgrade Prisma 5 to 6 for Node 20/22 compatibility

---

## Summary

Upgrades Prisma from v5.22.0 to v6.0.0 to support AWS Lambda Node 20/22 runtime and fixes AWS Amplify build errors.

### Key Changes

**Prisma Upgrade:**
- ✅ Upgrade @prisma/client from ^5.22.0 to ^6.0.0
- ✅ Add prisma CLI as devDependency
- ✅ Update binary target from rhel-openssl-1.0.x to rhel-openssl-3.0.x
- ✅ Automate Lambda Layer ARN capture in amplify.yml

**Lambda Layer Optimization:**
- ✅ Reduce layer size to under 70MB AWS limit by removing unnecessary files
- ✅ Copy only .prisma/client contents (exclude @prisma/* packages)
- ✅ Remove WASM file (query_engine_bg.wasm) not used by Node.js runtime
- ✅ Remove development-only binaries (darwin, rhel-openssl-1.0.x)

**Build Fixes:**
- ✅ Fix @parcel/watcher native binary rebuild for Linux environment
- ✅ Simplify npm ci commands to avoid caching conflicts
- ✅ Remove redundant npx prisma commands

**Documentation:**
- ✅ Add comprehensive Prisma upgrade plan (PRISMA_UPGRADE_PLAN.md)
- ✅ Update README with Prisma 6 setup instructions
- ✅ Document when to use Amplify hosted deployment vs sandbox
- ✅ Clarify Lambda Layer publishing workflow

### Breaking Changes

None - backward compatible upgrade

### Testing

- [x] Tested Prisma 6 client generation locally with Node 22
- [x] Verified correct binary targets generated
- [x] Amplify deployment testing succeeded on fix/update-prisma branch

### Fixes

- Fixes AWS Amplify build error: "Cannot find module query_engine_bg.postgresql.wasm-base64.js"
- Fixes RequestEntityTooLargeException: Lambda Layer exceeded 70MB limit
- Fixes @parcel/watcher Linux binary missing error
- Fixes multiple build and deployment errors encountered during testing

🤖 Generated with [Claude Code](https://claude.com/claude-code)
