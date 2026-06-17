FROM php:8.2-cli

# Step 1: Install all required compilers and dependencies
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    autoconf \
    automake \
    ca-certificates \
    git \
    unzip \
    curl \
    wget \
    gnupg \
    lsb-release \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libonig-dev \
    pkg-config \
    openssl \
    perl \
    default-mysql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Step 2: Install PHP extensions one by one for better error diagnosis
RUN docker-php-ext-install intl && \
    docker-php-ext-install pdo && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install pdo_sqlite && \
    docker-php-ext-install zip && \
    docker-php-ext-install xml && \
    docker-php-ext-install bcmath && \
    docker-php-ext-install opcache

# Step 3: Install APCU with fallback (optional)
RUN pecl install apcu && docker-php-ext-enable apcu || echo "APCU skipped"

# Step 4: Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Step 5: Install Symfony CLI
RUN curl -1sLf "https://get.symfony.com/cli/installer" | bash && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Step 6: Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get update && apt-get install -y --no-install-recommends nodejs \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Step 7: Install Yarn globally
RUN npm install -g yarn

# Step 8: Set application directory
WORKDIR /var/www/html

# Step 9: Copy dependency files first to leverage Docker cache
COPY composer.json composer.lock* ./
COPY package.json yarn.lock* ./

# Step 10: Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts || composer install --no-interaction --prefer-dist --optimize-autoloader

# Step 11: Install JavaScript dependencies
RUN yarn install --network-concurrency 1 || npm install

# Step 12: Copy the rest of the application code
COPY . .

# Step 13: Run Composer post-install scripts
RUN composer run-script --no-interaction post-install-cmd || true

# Step 14: Build assets
RUN yarn build || npm run build || true

# Step 15: Generate APP_SECRET if empty
RUN if [ -f .env ] && grep -q "^APP_SECRET=$" .env; then \
      sed -i "s/^APP_SECRET=$/APP_SECRET=$(openssl rand -hex 16)/" .env; \
    fi || echo "APP_SECRET setup completed or .env not found"

# Final configuration
EXPOSE 8000

ENV APP_ENV=dev \
    APP_DEBUG=1 \
    SYMFONY_ALLOW_APP_DIR=true \
    DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_dev.db"

# Start Symfony development server
CMD ["sh", "-lc", "symfony server:start --no-tls --allow-http --dir=public --port=8000 --allow-all-ip"]

