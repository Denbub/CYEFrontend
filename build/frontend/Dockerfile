FROM node:16

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV=production
COPY ./app/package.json ./app/yarn.lock ./
RUN yarn install
COPY ./app ./
RUN yarn build
ENTRYPOINT [ "yarn" , "production" ]
