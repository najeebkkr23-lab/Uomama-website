FROM node:20-slim

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production and build dependencies
RUN npm install

# Copy source code
COPY . .

# Build bundled server with esbuild
RUN npm run build

# Default environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
