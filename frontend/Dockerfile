# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Command to run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
