const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
var https = require('https');
var http = require('http');
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.join(__dirname, '../ui/build')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/build', 'index.html'))
  });
  var privateKey  = fs.readFileSync('key.pem');
  var certificate = fs.readFileSync('cert.pem');
  var credentials = {key: privateKey, cert: certificate};
  var httpsServer = https.createServer(credentials, app);
  httpsServer
    .listen(process.env.SERVER_PORT || 443, () => {
      console.log('now listening for requests at port 443');
    });
}
if (process.env.NODE_ENV === 'local') {
  app.use(express.static(path.join(__dirname, '../ui/build')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/build', 'index.html'))
  });
  var httpServer = http.createServer(app);
  httpServer
    .listen(process.env.SERVER_PORT || 8080, () => {
      console.log('now listening for requests at port 8080');
    });
}
if (process.env.NODE_ENV === 'dev') {
  var httpServer = http.createServer(app);
  httpServer
    .listen(process.env.SERVER_PORT || 4000, () => {
      console.log('now listening for requests at port 4000');
    });
}

// this will read a json file and return the json object as response
const uploadFile = (req, res) =>{
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.File;
  let filepath = '/tmp/'+file.name;
  file.mv(filepath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    fs.readFile(filepath, 'utf8', (err, jsonString) => {
      if (err) {
        return res.status(400).send('Cannot read file');
      }
      res.send(jsonString)
    })
  });
};

app
  .route('/api/uploadFile')
  .post(uploadFile);