# Stage 1: Build Frontend
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Server (Nginx + Node Express API)
FROM node:20-alpine

# Install Nginx
RUN apk add --no-network --no-cache nginx || apk add --no-cache nginx

WORKDIR /app

# Copy Backend Server
COPY server/package*.json ./server/
RUN cd server && npm ci --production
COPY server ./server

# Copy Frontend Build Output & Nginx Config
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80 3001

# Start Script: Launch Node Security API & Nginx
CMD ["sh", "-c", "node server/index.js & nginx -g 'daemon off;'"]
