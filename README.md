[![Node.js CI](https://github.com/Kaleidoscope-Systems/epitaph/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Kaleidoscope-Systems/epitaph/actions/workflows/node.js.yml)

Epitaph is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Its aim is to be a platform for managing the last wishes of the faithful and displaying information pages to the public. These instructions are incomplete and in progress.

## Getting Started

### Set Up The Database
- Install Postgres

- Install Postgres contrib modules
On Fedora, something like: `sudo dnf install postgresql15-contrib-15.5-4.fc40.x86_64`

- Login to Postgres `pgsql -U postgres`

- Create a user for the database `CREATE USER epitaph WITH PASSWORD 'your_pwd';`

- Create the database `CREATE DATABASE epitaphdb;`

- Grant privileges to the user for the database `GRANT ALL PRIVILEGES ON DATABASE epitaphdb TO epitaph;`

- Install the uuid-ossp extension `create extension "uuid-ossp";`

- Exit Postgres `\q`

- Login with the new user `psql -U postgres -d epitaphdb`

- Grant privileges on the schema to the new user
```sql
GRANT CREATE ON SCHEMA public TO epitaph;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO epitaph;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO epitaph;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO epitaph;
```

- Do a Prisma migration `npx prisma migrate dev`

### Application Setup
First, copy .env.local.example to .env.local and fill in the missing values. NEXT_PUBLIC_GA_MEASUREMENT_ID is only needed if you'd like to use Google Analytics.
Also copy .env.example to .env and fill in the missing values.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Grant Admin Rights
To give youself admin rights in the application, first login with one of the authentication providers. If all goes well, the application will show your name in the top right. Now, open up Postgres again.

- List users
```sql
select  id
,name
,email
,"emailVerified"
,image
,caps
from public."User"
LIMIT 1000
```

- Copy the `id` of your user. Use it in the following command:
```sql
UPDATE public."User"
SET caps = '{"editPeople": true, "viewPeople": true, "viewSettings": true, "viewDashboard": true, "editAllRecords": true, "viewAllRecords": true}'::jsonb
WHERE id = 'your_id_here';
```
This command fills in the `caps` column with the JSON needed to grant access to your user.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.