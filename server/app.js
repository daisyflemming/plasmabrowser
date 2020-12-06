const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(fileUpload());

// this will read a json file and return the json object as response
app.post('/fileupload', (req, res) =>{
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
});

// this will fetch a json file from a url and return the json object as response
app.get('/fetchfile', (req, res) =>{
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
});


app.listen(port, () => {
  console.log('now listening for requests on port 4000');
});
