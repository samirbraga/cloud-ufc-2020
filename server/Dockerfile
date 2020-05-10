FROM node:10 as build-stage

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD [ "node", "bin/index.js" ]