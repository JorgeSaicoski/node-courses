# base image
FROM node:14.17.5

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./

RUN npm install

# copy project files
COPY . .

# expose port
EXPOSE 5050

# start server
CMD [ "npm", "start" ]
