# FIX: Use Debian-based 'slim' instead of 'alpine' to support Tailwind's Rust engine
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy everything from your Windows machine
COPY . .

# Forcefully destroy any Windows modules that sneaked in
RUN rm -rf node_modules package-lock.json

# Install fresh dependencies using the correct Linux libraries
RUN npm install

# Expose Vite's port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev", "--", "--host"]
