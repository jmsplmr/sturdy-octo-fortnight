var express = require("express");
var app = express();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/database";
const pool = new Pool({connectionString: connectionString});


const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.ENV_URL || "localhost";

app.set("PORT", PORT)
   .use(express.json())
   .use(express.urlencoded({extended:true}))
   .use(express.static(__dirname + "/public"))
   .get("/video", getVideo)
   .get("/tags", getTags)
   .get("/courses", getCourses)
   .post("/video", postVideo)
   .listen(app.get("PORT"), function() {
     console.log("Listening on port: " + app.get("PORT"));
     console.log(PORT);
     console.log(BASE_URL);
   });

function getCourses(req, res) {
  getCoursesFromDB(function(error, result) {
    if (error || result == null || result.length < 1) {
      console.log("Something is wrong");
      res.status(500).json({success:false, data:error});      
    }

    console.log("Back with result:" + result);
    res.json(result);
  });
}

function getCoursesFromDB(callback) {
  var sql = "SELECT name, street_address, city, state, zip, phone, contact FROM courses";

  pool.query(sql, function(err, result){
    if (err) {
      console.log("Server console");
      console.error(err);
      callback(err, null);
    }

    console.log("Got results:" + result);

    callback(null, result.rows);
  });
}

function getVideo(req, res) {
  console.log("Get video:");
}

function getTags(req, res) {
  console.log("Get tags:");
  //console.log(process.env);
}

function postVideo(req, res) {
  console.log("Post video:");
}