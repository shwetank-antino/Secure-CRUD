FROM node:20-alpine

# Create non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only package files first (layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy source code
COPY src ./src
COPY server.js ./server.js

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
