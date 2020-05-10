FROM node:10 as react-build

WORKDIR /app

USER root

COPY . ./

RUN npm i
RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-p", "3000", "-s", "dist"]