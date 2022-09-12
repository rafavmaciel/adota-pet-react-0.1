FROM node:14.16.0

WORKDIR /usr/src/app/

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    vim \
    nano

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json /usr/src/app/

RUN mkdir /usr/src/app/node_modules

RUN chown node:node -R /usr/src/app/node_modules/

RUN npm install

RUN rm /usr/src/app/package-*.json

COPY . .
