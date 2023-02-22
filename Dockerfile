FROM node:16.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/prisma ./prisma/
COPY .env.dev ./
COPY tsconfig.json ./

COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 9000
CMD [ "npm", "start" ]