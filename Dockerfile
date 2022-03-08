FROM node:17.4.0 AS development

RUN apt-get update
RUN apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:17.4.0 as production

RUN apt-get update
RUN apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]