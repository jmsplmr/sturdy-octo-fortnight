function handleDBError(callback) {
  return function(err, result) {
    if (err) {
      console.log('Server error');
      console.error(err);
      callback(err, null);
    }
    console.log('Got results: ' + result);
    callback(null, result.rows);
  };
}

export handleDBError;