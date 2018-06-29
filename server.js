var express = require("express");
var app = express();

const PORT = process.env.PORT;

const BASE_URL = process.env.ENV_URL;

app.set("PORT", PORT)
   .use(express.json())
   .use(express.urlencoded({extended:true}))
   .use(express.static(__dirname + "/public"))
   .get("/video", getVideo)
   .get("/tags", getTags)
   .post("/video", postVideo)
   .listen(app.get("PORT"), function() {
     console.log("Listening on port: " + app.get("PORT"));
     console.log(PORT);
     console.log(BASE_URL);
   });

function getVideo(req, res) {
  console.log("Get video:");
}

function getTags(req, res) {
  console.log("Get tags:");
}

function postVideo(req, res) {
  console.log("Post video:");
}