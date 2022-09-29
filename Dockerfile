FROM node:18.8.0
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install --force
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]