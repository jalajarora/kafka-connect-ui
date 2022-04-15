FROM node:12 AS builder
WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN $NPM_TOKEN

ARG ENVIRONMENT
ENV ENVIRONMENT $ENVIRONMENT

COPY package*.json ./

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
RUN npm ci
RUN rm -f .npmrc

#COPY . .
COPY ./src /app/src/
COPY *.* /app/
RUN npm install && npm run build ${ENVIRONMENT}
#RUN npm run build:${ENVIRONMENT}

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/kafka-connect-ui/ /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

