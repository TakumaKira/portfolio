# Takuma's Portfolio

## How to run

This project uses postgres database. By getting some config data from the database, I as a maintainer can manage some of the contents without modifying the source code and redeploying the application. I leverage Server Component to let Next.js server get the config data directly from the database and render it on the page. These config data are embedded in the HTML as a script tag and no API calls happen on the client side, which is more secure than using API routes.

I uses pnpm as package manager for this project, but you should be able to use npm or yarn as well.

### Install dependencies

```bash
pnpm install
```

### Install prisma cli

I use [Prisma](https://www.prisma.io) to manage the database schema and migrations. So you need to install prisma cli to run some commands.

```bash
pnpm dlx prisma
```

### Generate types for prisma client

You need to generate types using prisma cli to correctly reference types of schema in your IDE.

```bash
pnpm prisma generate
```

### Prepare database

The easiest way to run postgres is using VMs like [Docker](https://www.docker.com) or [OrbStack](https://www.orbstack.dev). Install and run one of them.

Pull the postgres image.

```bash
docker pull postgres
```

Run the postgres container.

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgre
```

Create a database named `portfolio`. Connect to the database and run the following query.

```sql
CREATE DATABASE portfolio;
```

### Deploy prisma migrations

Migrate the schema to the postgres database using prisma cli.

```bash
CONFIG_DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio npx prisma migrate deploy
```

Now you have a database works for this project.

### Insert config

Provide the config data to the database, otherwise the application will output console errors and some parts of the page will not work as expected.

```bash
INSERT INTO "public"."Config" ("id", "name", "type", "value") VALUES
(1, 'name', 'STRING', 'Takuma'),
(2, 'repository_url', 'STRING', 'https://github.com/TakumaKira/portfolio'),
(3, 'storybook_url', 'STRING', 'https://storybook.js.org'),
(4, 'cpsaf_certification_url', 'STRING', 'https://www.certible.com/badge/33141297-d6b6-4dff-9d43-f36452d85d5c'),
(5, 'figma_url', 'STRING', 'https://www.figma.com/design/Hcj8I0Y6umFS5mymgsgVKp/Takuma''s-Portfolio-202411');
```

### Run Next.js

Finally, run the Next.js application. Next.js server requires the database url to connect to the database. You can run the production server by providing the production database url, which is reachable from the Next.js server instance.

```bash
CONFIG_DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio pnpm dev
```
