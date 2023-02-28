FROM node:14.17.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start"]