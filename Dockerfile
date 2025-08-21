FROM node:18-slim

WORKDIR /app

# Install dependencies first for better caching
COPY package.json ./
RUN npm install --production

# Copy the rest of the app
COPY . ./

ENV PORT 8080
EXPOSE 8080

CMD ["node", "server.js"]
