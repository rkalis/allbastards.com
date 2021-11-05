# BUILD IMAGE
FROM node:12 as build

WORKDIR /app

# Generate build
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# Add app
COPY . /app

# Build app
RUN yarn build

# ###############################################################################

# PROD IMAGE
FROM nginx:1.17.0-alpine

# Invalidate cache
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
