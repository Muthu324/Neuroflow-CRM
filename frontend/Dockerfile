# FIX: Upgrade to Node 20 to patch the known NPM optional dependency bug
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy everything from your Windows machine
COPY . .

# Destroy the Windows files and clear the broken NPM cache
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force

# Install fresh dependencies using the patched NPM version
RUN npm install

# Expose Vite's port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev", "--", "--host"]
