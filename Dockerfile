# Filename: Dockerfile
FROM node:10-alpine
WORKDIR /data
COPY . /data
RUN cd ui && npm install && npm run build

ENV NODE_ENV=local
ENV SERVER_PORT=8080
EXPOSE 8080
RUN cd server; npm install
WORKDIR /data/server
CMD [ "node", "app.js" ]

# cd /Users/daisyflemming/WebstormProjects/daisyflemming/plasmabrowser_project
# docker build . -t daisyflemming/plasmabrowser
# docker run -d -p8080:8080 daisyflemming/plasmabrowser

