# Build Stage
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .

# Install packages
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build --omit=dev
# Install `serve` to run the application.
RUN npm install -g serve

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["serve", "-s", "dist"]