# start from lightweight node image
FROM node:23-alpine

# cd
WORKDIR /app

# gather dependancies
COPY package.json .

# install npm and serve
RUN npm install
RUN npm i -g serve

# copy the rest
COPY . .

# build
RUN npm run build

# expose production port
EXPOSE 3000

# run the server
CMD ["serve", "-s", "dist"]