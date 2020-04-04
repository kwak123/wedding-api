FROM node:10

WORKDIR /app

COPY . .

RUN yarn global add nodemon
# RUN yarn && mv /app/node_modules /node_modules
RUN yarn
RUN yarn build

EXPOSE 8080
