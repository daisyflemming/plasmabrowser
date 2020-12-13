# plasmabrowser

# Instructions for deploying the full application

## In development

##### 1. start the Express server at http://localhost:4000/
```
% git clone https://github.com/daisyflemming/plasmabrowser.git
% cd plasmabrowser/server; npm install
% env NODE_ENV=dev nodemon app.js
```

##### 2. start the web application at http://localhost:3000/
```
% git clone https://github.com/daisyflemming/plasmabrowser.git
% cd plasmabrowser/ui
% npm install; npm start
```
This would allow you to debug the server applicatioon and the web application separately. This works well especially when you are using a IDE
Note that the following line in ui/package.json tells React to proxy API requests to the Express server. This is only useful in the dev environment.
```
  "proxy": "http://localhost:4000"
```
## In local environment

Start the full application through Express server at http://localhost:8080/
```
% git clone https://github.com/prismbioanalytics/Webserver.git
% cd plasmabrowser/ui; rm -rf build/;npm install;npm run build
% cd ../server; npm install
% env NODE_ENV=local SERVER_PORT=8080 node app.js
```

## In production with SSL

Start the full application through Express server at https://localhost:443/. 
Note: You will need to follow the cloud provider SSL policy and set up the environment accordingly.
```
% git clone https://github.com/daisyflemming/plasmabrowser.git
% cd plasmabrowser/ui; rm -rf build/;npm install;npm run build
% cd ../server; npm install; env NODE_ENV=prod SERVER_PORT=443 node app.js
```

## Deploy locally with docker container
```
% git clone https://github.com/daisyflemming/plasmabrowser.git
% cd plasmabrowser
% docker build . -t daisyflemming/plasmabrowser
% docker run -d -p8080:8080 daisyflemming/plasmabrowser

```