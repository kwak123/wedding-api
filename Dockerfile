FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install && mv /app/node_modules /node_modules

COPY . .

EXPOSE 8080
