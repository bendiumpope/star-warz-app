FROM node:14
ENV NODE_ENV=production

EXPOSE 3001

WORKDIR /src

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install --production

COPY . .

CMD [ "yarn", "start" ]