var express = require('express');
var app = express();
var error = require('/src/web_endpoints/db/error.js');

const {
  Pool
} = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString
});

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.ENV_URL || 'localhost';

app.set('PORT', PORT)
  .use(express.json())
  .use(express.urlencoded({
    extended: true
  }))
  .use(express.static(__dirname + '/public'))
  .get('/courses/', getCourses)
  .get('/course/:id', getCourse)
  .get('/rounds/:id', getUserRounds)
  .post('/course', postCourse)
  .listen(app.get('PORT'), function () {
    console.log('Listening on port ', app.get('PORT'));
    console.log('PORT', PORT);
    console.log('BASE_URL', BASE_URL);
  });

function postCourse(req, res) {
  console.log('Add a course to the database');

  var name = req.body.name;
  var phone = req.body.phone;
  var contact = req.body.contact;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;

  var params = [name, address, city, state, zip, phone, contact];

  console.log(params);

  addCourseToDB(params, handleServerError(res));
}

function addCourseToDB(params, callback) {
  console.log('Course:' + params);

  var sql = 'INSERT INTO courses (name, street_address, city, state, zip, phone, contact) VALUES ($1, $2, $3, $4, $5, $6, $7)';

  pool.query(sql, params, handleDBError(callback));
}

function getUserRounds(req, res) {
  console.log('Add a course to the database');

  var id = req.params.id;
  console.log('Get course' + id);

  getRoundFromDBbyId(id, handleServerError(res));
}

function getRoundFromDBbyId(id, callback) {
  console.log('getCourseFromDBbyId, course#' + id);

  var params = [id];
  var sql = 'SELECT score, g.name  AS format, c2.name AS course, r.date FROM rounds r INNER JOIN courses c2 on r.course_id = c2.id INNER JOIN game_format g on r.format_id = g.id WHERE user_id = $1::int ORDER BY r.date';

  pool.query(sql, params, handleDBError(callback));
}

function handleServerError(res) {
  return function (err, result) {
    if (err || result == null) {
      console.log('Something is wrong');
      res.status(500).json({
        success: false,
        data: err
      });
    }
    console.log('Back with result:' + result);
    res.json(result);
  };
}

function getCourseFromDBbyId(id, callback) {
  var sql = 'SELECT name, street_address, city, state, zip, phone, contact FROM courses WHERE id = $1::int';
  var params = [id];

  pool.query(sql, params, handleDBError(callback));
}

function getCourse(req, res) {
  var id = req.params.id;
  console.log('Get course' + id);

  getCourseFromDBbyId(id, handleServerError(res));
}

function getCourses(req, res) {
  console.log('Get the courses list');

  getCoursesFromDB(handleServerError(res));
}

function getUsersRatedCoursesFromDB(id, callback) {
  console.log('GetUsersRatedCourseFromDB, User:' + id);

  var params = [id];
  var sql = 'SELECT courses.id, name, street_address AS address, city, state, rating FROM courses INNER JOIN course_rating rating2 on courses.id = rating2.course_id WHERE rating2.user_id = $1::int';

  pool.query(sql, params, handleDBError(callback));
}