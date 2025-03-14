# Single-stage build
FROM node:23-alpine

# Install Caddy
RUN apk add --no-cache caddy

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all files
COPY . .

# Build the app
RUN yarn build

# Copy Caddyfile to Caddy's configuration directory
COPY Caddyfile /etc/caddy/Caddyfile

# Move built files to Caddy's serve directory
RUN mkdir -p /usr/share/caddy && \
    cp -r /app/dist/* /usr/share/caddy/

# Expose ports
EXPOSE 443 443
EXPOSE 80 80

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
