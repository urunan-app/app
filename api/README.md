# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# @urunan-app/api

`@urunan-app/api` is the backend for the Urunan app, built using [Elysia](https://elysiajs.com/) and [Bun](https://bun.sh/).

Why Elysia?

- Faster than Express
- End-to-end type safety
- Bult-in RPC-like connector with [Eden](https://elysiajs.com/eden/overview) (useful for server and client communication)

## Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/urunan-app/api
cd api
```

2. Install the dependencies

```bash
bun install
```

3. **Set-up local PostgreSQL database**

```bash
docker-compose -p urunan-api up -d
```

Now, you should have a PostgreSQL database running on `localhost:5432` with the following URL `postgresql://urunan:urunan@localhost:5432/urunan-db`

4. Copy the `.env.example` file to `.env` and update the environment variables

```bash
cp .env.example .env
```

5. **Run the database migration**

```bash
bun run db:migrate
bun run db:push
bun run db:seed
```

6. **Seed the database**

```bash
bun run seed:run
```

6. **Start the development server**

```bash
bun run dev
```

## Develop with `@urunan-app/web` Locally

`@urunan-app/web` utilize `@urunan-app/api`'s [Elysia](https://elysiajs.com) end-to-end [RPC-like connector](https://elysiajs.com/eden/overview) with typesafety feature to ensure the API and web projects are in sync. In order to do so, you need to link the API package to the web project using `bun link`.

1. **Link the API Package**

   Navigate to the API repository folder (`/api`) and initiate the API package linkage:

   ```bash
   bun link
   ```

2. **Clone the Web Repository**

   Clone the `@urunan-app/web` repository outside the `/api` folder. You can skip this step if you already have the `/web` folder somewhere else.

   ```bash
   git clone https://github.com/urunan-app/web
   ```

3. **Link the API Package in the Web Repository**

   Navigate to the `/web` repository folder and link the local `@urunan-app/api` package inside the `/web` repository folder:

   ```bash
   cd web
   bun link @urunan-app/api
   ```

4. **Start the Development Server**

   In the `/web` repository folder, start the development server:

   ```bash
   bun run dev
   ```
