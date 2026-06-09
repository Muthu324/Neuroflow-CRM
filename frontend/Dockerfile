# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# COPY ONLY package.json (Ignore the package-lock.json to prevent OS conflicts)
COPY package.json ./

# Install fresh dependencies for Linux
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Command to run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
