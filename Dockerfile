FROM php:8.2-cli

# Instala herramientas del sistema y dependencias para extensiones PHP
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    unzip \
    curl \
    gnupg \
    lsb-release \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libonig-dev \
    default-mysql-client \
    pkg-config \
    openssl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Compila extensiones PHP necesarias (sin gd para evitar problemas de compilación)
RUN docker-php-ext-install -j$(nproc) intl pdo pdo_mysql pdo_sqlite zip xml bcmath opcache \
  && pecl install apcu \
  && docker-php-ext-enable apcu

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala Symfony CLI
RUN curl -1sLf "https://get.symfony.com/cli/installer" | bash \
  && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Instala Node.js (LTS) y habilita Corepack para usar Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get update && apt-get install -y --no-install-recommends nodejs \
  && corepack enable \
  && corepack prepare yarn@stable --activate \
  && rm -rf /var/lib/apt/lists/*

# Directorio de la aplicación
WORKDIR /var/www/html

# Copia solo archivos de dependencias primero para aprovechar cache de Docker
COPY composer.json composer.lock* ./
COPY package.json yarn.lock* ./

# Instala dependencias PHP y JS
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts || composer install --no-interaction --prefer-dist --optimize-autoloader
RUN yarn install --network-concurrency 1 || npm install

# Copia el resto del código
COPY . .

# Ejecuta scripts de Composer (por ejemplo assets:install, importmap, etc.)
RUN composer run-script --no-interaction post-install-cmd || true

# Compila los assets (build para producción)
RUN yarn build || npm run build || true

# Exponer puerto
EXPOSE 8000

# Genera APP_SECRET si está vacío (para desarrollo)
RUN if grep -q "^APP_SECRET=$" .env 2>/dev/null; then \
      sed -i "s/^APP_SECRET=$/APP_SECRET=$(openssl rand -hex 16)/" .env; \
    fi || echo "APP_SECRET already set or .env not found"

# Variables de entorno por defecto para desarrollo
ENV APP_ENV=dev \
    APP_DEBUG=1 \
    SYMFONY_ALLOW_APP_DIR=true \
    DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_dev.db"

# Comando por defecto: arranca servidor Symfony en primer plano, accesible en 0.0.0.0:8000
CMD ["sh", "-lc", "symfony server:start --no-tls --allow-http --dir=public --port=8000 --allow-all-ip"]

