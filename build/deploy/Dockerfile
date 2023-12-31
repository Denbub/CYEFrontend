FROM node:18.16.1
RUN apt-get update && apt-get install awscli -y
RUN mkdir /app
WORKDIR /app
COPY ./deploy/package.json ./deploy/package-lock.json ./
RUN npm install --global cdktf-cli@v0.17.1
RUN npm install
COPY --from=hashicorp/terraform /bin/terraform /bin/terraform
COPY /deploy /app
ENTRYPOINT ["cdktf"]
CMD [ "deploy", "--auto-approve"]
