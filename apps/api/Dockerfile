FROM oven/bun:1 AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Development stage
FROM base AS development
RUN bun install --frozen-lockfile
EXPOSE 3001
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production
EXPOSE 3001
CMD ["bun", "run", "start"]
