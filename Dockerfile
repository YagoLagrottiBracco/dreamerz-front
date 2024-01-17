FROM node:18-alpine
WORKDIR /usr/src/api
RUN addgroup front && adduser -S -G front front
USER front
COPY package.json .
USER root
RUN chown -R front:front /usr/src/front
USER front
RUN npm install
COPY . .
CMD ["npm", "start"]