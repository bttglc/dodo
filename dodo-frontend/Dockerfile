# Build Stage
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install packages
RUN npm install

# Copy source files to the working directory
COPY . .

# Build the application
RUN npm run build --omit=dev

# Install `serve` globally to run the application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application using `serve`
CMD ["serve", "-s", "dist"]
