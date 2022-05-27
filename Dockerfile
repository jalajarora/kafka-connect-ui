FROM node:16.14.2 AS builder
WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN $NPM_TOKEN

COPY package*.json ./

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
RUN npm install
RUN rm -f .npmrc

COPY ./src /app/src/
COPY *.* /app/
RUN npm install && npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/output/ /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["/bin/sh",  "-c",  "apt-get update && apt-get -y install gettext-base && apt-get clean && envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
