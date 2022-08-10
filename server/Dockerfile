FROM alpine/git:v2.32.0 as wait
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait

FROM node:latest
ARG DEBUG=false

COPY --from=wait /wait /.
RUN chmod +x /wait

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

CMD /wait && yarn run start
