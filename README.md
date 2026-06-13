# Scrumbag Core

Guide to clone, install, and run the Symfony project with Webpack Encore.

## Prerequisites

- Git
- PHP 8.2 or higher
- Composer 2
- Node.js 18+ (recommended 18 LTS or 20 LTS)
- npm or Yarn
- Optional: Symfony CLI (`symfony`) for local development server

## Using nvm for Node.js

If Node.js is not installed, `nvm` is a recommended option.

```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js 18
nvm install 18
nvm use 18

# Verify versions
node -v
npm -v
```

## Clone the repository

```bash
mkdir -p /path/to/project
cd /path/to/project

git clone <REPOSITORY_URL> scrumbag-core
cd scrumbag-core
```

> Replace `<REPOSITORY_URL>` with the repository URL.

## Install PHP dependencies

```bash
composer install
```

This installs all dependencies defined in `composer.json` and runs Symfony auto-scripts.

### Production install

```bash
composer install --no-dev --optimize-autoloader
```

## Install JavaScript dependencies

The project uses Webpack Encore and Node dependencies.

With npm:

```bash
npm install
```

With Yarn:

```bash
yarn install
```

## Build assets with Webpack Encore

### Development build

```bash
npm run dev
# or
yarn dev
```

### Watch for changes

```bash
npm run watch
# or
yarn watch
```

### Encore dev server

```bash
npm run dev-server
# or
yarn dev-server
```

### Production build

```bash
npm run build
# or
yarn build
```

## Start the local server

### Option 1: Symfony CLI (recommended)

```bash
symfony server:start
```

### Option 2: PHP built-in server

```bash
php -S localhost:8000 -t public
```

Then open:

```text
http://localhost:8000
```

## Environment variables

The project reads values from `.env` and `.env.local`.

There is a base `.env` file in the repository. If you need local overrides, create or copy:

```bash
cp .env .env.local
```

Make sure to define at least:

- `APP_SECRET`
- `DATABASE_URL` if you use a database

## Recommendations

- Use PHP 8.2+ to satisfy `composer.json`
- Use Node 18+ with npm or Yarn for asset compilation
- If the app does not start, check `.env` and `composer install` errors
- For production, run `npm run build` and `composer install --no-dev --optimize-autoloader`

## Useful commands

```bash
# Install dependencies
composer install
npm install

# Compile assets for development
npm run dev

# Compile assets for production
npm run build

# Start Symfony server
symfony server:start
```

## Relevant structure

- `bin/console` — Symfony console
- `public/` — public web directory
- `assets/` — source JavaScript and CSS
- `templates/` — Twig templates
- `src/` — application PHP code
- `webpack.config.js` — Webpack Encore configuration
