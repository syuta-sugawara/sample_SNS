FROM node:12.16.2

WORKDIR /usr/src/app

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]