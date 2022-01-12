FROM node:17.3.1

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3080
CMD [ "yarn", "start" ]