# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy everything from your Windows machine into the container
COPY . .

# Forcefully delete the Windows modules that cause the Native Binding crash
RUN rm -rf node_modules package-lock.json

# Install fresh, clean Linux dependencies
RUN npm install

# Expose Vite's default port (matching your package.json)
EXPOSE 3000

# Command to run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
