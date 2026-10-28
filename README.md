# Welcome to your AutoCoder.cc project

## Project info

- **Project ID:** PROJ_63637aa4_snap_20261012_203801_092
- **Version:** [Visual edits] sync 20 edits
- **URL:** [AutoCoder.cc](https://www.autocoder.cc/platform/generate/1667463844?PROJECTID=PROJ_63637aa4)
## Getting Started

**Prerequisites:** Node.js (recommend [nvm](https://github.com/nvm-sh/nvm)) and [pnpm](https://pnpm.io/).

```bash
cd kuskolace.io

# Install dependencies
pnpm install

# Copy .env.example to .env and fill DATABASE_URL, SEED_ADMIN_PASSWORD,
# and a long random JWT_SECRET before continuing.
cp .env.example .env

# Prepare a new empty MySQL database, generate the client and seed content
pnpm exec prisma generate
pnpm exec prisma db push
pnpm exec prisma db seed
pnpm run build:server -- --rebuild-common

# Run development
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The backend API runs at [http://localhost:3001](http://localhost:3001).

**Quick Links**
- **Website** — [http://localhost:3000/](http://localhost:3000/)
- **Backend** — [http://localhost:3000/adminhome](http://localhost:3000/adminhome)

---

## How can I edit this project?

You can work on this project in several ways:

### Use AutoCoder.cc

Visit [AutoCoder.cc](https://www.autocoder.cc/platform/generate/1667463844?PROJECTID=PROJ_63637aa4) and use the editor. Changes are committed automatically to the connected repo.

### Use your IDE locally

Clone the repo, then from the project root:

1. Install dependencies
2. `pnpm run init` initializes the database and rebuilds the server action common bundle
3. Edit files
4. if you edit actions, run `pnpm run build:server` to rebuild
5. Start frontend: `pnpm run dev` (port 3000)

---



## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- Prisma
- shadcn/ui

## Repository import notes

Imported from the supplied project archive. Installed dependencies, build caches,
generated Prisma/server bundles, API traces and the SQL dump are excluded.
Generate clients and server bundles locally using the commands above.
The original embedded database/admin passwords have been removed; configure your own in `.env`.
The legacy `pnpm run init` command resets the selected database; use only with a disposable local database.
This import has not been deployed or verified against a running MySQL database.
