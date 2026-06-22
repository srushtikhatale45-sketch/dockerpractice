FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Only install production dependencies
RUN npm install --only=production

COPY . .

EXPOSE 8000

# Use node directly, not npm run dev
CMD ["node", "index.js"]