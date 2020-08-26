// server.js

// init project
var express = require('express');
var app = express();
const FormData = require('form-data');
const assets = require('./assets');
const fs = require('fs');
const bodyParser = require("body-parser");
const multer = require('multer');

app.use(bodyParser.json());

const sql = require("sqlite3").verbose();
const shopDB = new sql.Database("shoppingList.db");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='ShopTable' ";
shopDB.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createGrandmasDB();
    } else {
        console.log("Database file found");
        
    }
});

function createGrandmasDB() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE ShopTable ( rowIdNum INTEGER PRIMARY KEY, bio TEXT, name TEXT, major TEXT, picture TEXT)';
  shopDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}


app.post('/sharePostcard', function (request, response){
  
  let item = request.body.message;
  let amount = request.body.major;
  let letters = request.body.name;
  let picture = request.body.picture;
  
  cmd = "INSERT INTO ShopTable ( bio, name, major, picture ) VALUES (?,?,?,?) ";
    shopDB.run(cmd,item,letters,amount, picture, function(err) {
  });
  
});

app.post('/search', function (request, response){
  
  let xcmd = 'SELECT * FROM ShopTable WHERE name =';
  let together = xcmd + JSON.stringify(request.body.name);
  
  shopDB.all( together, (err, rowData) => { 
    response.send(rowData);
  });
  
});

app.post('/show', function (request, response){
  
  let xcmd = 'SELECT * FROM ShopTable';
  
  shopDB.all( xcmd, (err, rowData) => { 
    response.send(rowData);
    //console.log(rowData);
  });
  
});

app.post('/overlay', function (request, response){
  
  let xcmd = 'SELECT * FROM ShopTable WHERE rowIdNum = ';
  let together = xcmd + JSON.stringify(request.body.idNum);
  
  shopDB.all( together, (err, rowData) => { 
    response.send(rowData);
  });
  
});


// Make a "storage" object that explains to multer where to store the images...in /images
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  // keep the file's original name
  // the default behavior is to make up a random string
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Use that storage object we just made to make a multer object that knows how to 
// parse FormData objects and store the files they contain
let uploadMulter = multer({storage: storage});

app.post('/upload', uploadMulter.single('newImage'), function (serverRequest, serverResponse) {

  let filename = "/images/"+serverRequest.file.originalname;
  // the file object "request.file" is truthy if the file exists
  let apiKey = process.env.ECS162KEY;
  if (apiKey === undefined) {
    serverResponse.status(400);
    serverResponse.send("No API key provided");
  } else {
    // we'll send the image from the server in a FormData object
    let form = new FormData();
    
    // we can stick other stuff in there too, like the apiKey
    form.append("apiKey", apiKey);
    // stick the image into the formdata object
    form.append("storeImage", fs.createReadStream(__dirname + filename));
    // and send it off to this URL
    form.submit("http://ecs162.org:3000/fileUploadToAPI", function(err, APIres) {
      // did we get a response from the API server at all?
      if (APIres) {
        // OK we did
        console.log("API response status", APIres.statusCode);
        // the body arrives in chunks - how gruesome!
        // this is the kind stream handling that the body-parser 
        // module handles for us in Express.  
        let body = "";
        APIres.on("data", chunk => {
          body += chunk;
        });
        APIres.on("end", () => {
          // now we have the whole body
          if (APIres.statusCode != 200) {
            serverResponse.status(400); // bad request
            serverResponse.send(" Media server says: " + body);
          } else {
            serverResponse.status(200);
            serverResponse.send(body);
          }
        });
      } else { // didn't get APIres at all
        serverResponse.status(500); // internal server error
        serverResponse.send("Media server seems to be down.");
      }
    });
  }
  
  fs.unlink("."+filename, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  })
});