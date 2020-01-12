// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
var expressWs = require('express-ws')(app);

function startWebsocket() {
  app.ws('/manager', function(ws, req) {
    app.get("/stopApp", function(request, response) {
      ws.send('Stop!')
      response.json("Stopped!")
    });
    ws.on('close', req=> {
      console.log("Closed!")
      process.exit(1);
    })
    ws.on('connection', req=> {
      console.log("Opened!")
    })
  });
}
startWebsocket()
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
