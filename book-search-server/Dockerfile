# syntax=docker/dockerfile:1

FROM node:16.14.0

WORKDIR /app
COPY .. ./

# allow `npm ci` run prepare script properly when using root account
RUN npm ci

EXPOSE 8000

CMD [ "npm", "run", "start" ]