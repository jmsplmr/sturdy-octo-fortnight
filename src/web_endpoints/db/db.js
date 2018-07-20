var error = require('./error');

function getCoursesFromDB(callback) {

  console.log('Get courses from DB');

  let sql = 'SELECT name, street_address, city, state, zip, phone, contact FROM courses';

  pool.query(sql, error.handleDBError(callback));
}
