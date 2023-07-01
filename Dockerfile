FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run register-commands
CMD [ "npm", "run", "dev" ]