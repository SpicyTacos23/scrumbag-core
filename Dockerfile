###############################################
# STAGE 1 — Build frontend assets
###############################################
FROM node:24 AS frontend

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install

COPY . .
RUN yarn build


###############################################
# STAGE 2 — Install PHP dependencies (vendor)
###############################################
FROM php:8.2-cli AS vendor

# Dependencias necesarias para Composer
RUN apt-get update && apt-get install -y --no-install-recommends \
    libicu-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libsqlite3-dev \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Extensiones mínimas necesarias para Composer
RUN docker-php-ext-install intl zip pdo pdo_mysql pdo_sqlite bcmath

WORKDIR /app

COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

COPY . .
RUN composer dump-autoload --optimize
RUN composer run-script --no-interaction post-install-cmd || true


###############################################
# STAGE 3 — Runtime (PHP-FPM + Symfony CLI)
###############################################
FROM php:8.2-fpm

# Dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    libicu-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libsqlite3-dev \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Extensiones PHP necesarias en runtime
RUN docker-php-ext-install intl zip pdo pdo_mysql pdo_sqlite bcmath opcache

# Instalar Symfony CLI
RUN curl -1sLf "https://get.symfony.com/cli/installer" | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

WORKDIR /app

# Copiar vendor y build
COPY --from=vendor /app /app
COPY --from=frontend /app/public/build /app/public/build

# Copiar resto del proyecto
COPY . .

EXPOSE 8000

CMD ["symfony", "server:start", "--no-tls", "--port=8000", "--allow-http", "--allow-all-ip"]
