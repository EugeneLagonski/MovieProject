FROM node

WORKDIR /frontend
COPY package.json /frontend

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]