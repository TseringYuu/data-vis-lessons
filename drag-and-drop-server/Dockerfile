FROM node:latest
WORKDIR /drag-and-drop-server
COPY package.json ./
RUN npm i --registry=https://registry.npm.taobao.org
COPY . .
EXPOSE 80
CMD sh -c './lib/wait-for-it/wait-for-it.sh db:3306 -- node app.js'
