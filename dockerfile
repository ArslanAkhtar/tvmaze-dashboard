# Use Node.js Alpine image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the project files
COPY . .

# Install Xvfb to support Cypress
RUN apk add --no-cache xvfb

# Expose Vite port
EXPOSE 5173

# Start Vite, Vitest, and Cypress in headless mode
CMD ["sh", "-c", "npm run dev & npm run test:unit && xvfb-run -- npm run test:e2e:headless"]
