# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# @urunan-app/web

`@urunan-app/web` is the web frontend for the Urunan app, built using [Waku](https://waku.gg/) and [Bun](https://bun.sh/), deployed to [Vercel](https://vercel.com).

We decided to use Waku because:

- Simple, minimal, and light-weight React framework with zero configuration
- Support React Server Components (great for SEO)
- Built-in support for TypeScript and page router

## Prerequisites

- [Bun](https://bun.sh/)

## Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/urunan-app/web
cd web
```

2. Install the dependencies

```bash
bun install
```

3. Copy the `.env.example` file to `.env` and update the environment variables

```bash
cp .env.example .env
```

4. **Start the development server**

```bash
bun run dev
```

## Develop with `@urunan-app/api` Locally

`@urunan-app/web` utilize `@urunan-app/api`'s [Elysia](https://elysiajs.com) end-to-end [RPC-like connector](https://elysiajs.com/eden/overview) with typesafety feature to ensure the API and web projects are in sync. In order to do so, you need to link the API package to the web project using `bun link`.

To set up and develop both the API and web projects locally, follow these steps:

1. **Link the API Package**

   Navigate to the API repository folder (`/api`) and initiate the API package linkage:

   ```bash
   bun link
   ```

2. **Link the API Package in the Web Repository**

   Navigate to the `/web` repository folder and link the local `@urunan-app/api` package inside the `/web` repository folder:

   ```bash
   cd web
   bun link @urunan-app/api
   ```

3. **Start the Development Server**

   In the `/web` repository folder, start the development server:

   ```bash
   bun run dev
   ```
