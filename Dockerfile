###############################################
# STAGE 1 — Build frontend assets
###############################################
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

###############################################
# STAGE 2 — PHP dependencies
###############################################
FROM php:8.2-cli AS vendor

RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    libicu-dev \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install zip intl opcache

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY composer.json composer.lock ./

# --no-dev en producción, con dev en local se maneja con ARG
RUN composer install --optimize-autoloader --no-interaction --no-scripts

COPY . .
RUN composer dump-autoload --optimize

###############################################
# STAGE 3 — Runtime
###############################################
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    libicu-dev \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install zip intl opcache

# Instalar Symfony CLI
RUN curl -1sLf "https://get.symfony.com/cli/installer" | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

WORKDIR /app

# Traer vendor del stage 2
COPY --from=vendor /app /app

# Traer assets compilados del stage 1
COPY --from=frontend /app/public/build /app/public/build

# Crear .env vacío para que Symfony no falle (las vars vienen de Render)
RUN touch /app/.env

# Permisos en var/
RUN mkdir -p var/cache var/log && chmod -R 777 var/

EXPOSE 8000

CMD ["symfony", "server:start", "--no-tls", "--port=8000", "--allow-http", "--allow-all-ip", "--listen-ip=0.0.0.0"]