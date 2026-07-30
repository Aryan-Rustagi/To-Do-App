FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY client/package*.json ./client/
COPY server/package*.json ./server/


RUN npm install --prefix client && npm install --prefix server

COPY . .

RUN npm run build --prefix client

EXPOSE 5000

ENV PORT=5000

CMD ["npm", "start"]