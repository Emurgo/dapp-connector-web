FROM node:16.14.2-alpine3.14
WORKDIR /usr/src/app
RUN apk add git
COPY . .
RUN npm install
CMD npm start
