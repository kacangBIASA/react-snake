# Dockerfile
FROM node:18

# install expo CLI globally (lightweight)
RUN npm install -g expo-cli

# create app dir
WORKDIR /usr/src/app

# copy package files first (cache npm install)
COPY package.json package-lock.json* yarn.lock* ./

# install deps
RUN npm install --production=false

# copy rest
COPY . .

# expose metro bundler port and web
EXPOSE 19000 19001 19002

# default command for development: start expo in tunnel mode
CMD ["npm", "run", "start"]
