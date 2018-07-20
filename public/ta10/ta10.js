$(document).ready(function() {
  $('#submit').click(function() {
    let apikey = '5cee8628';

    let url = 'http://www.omdbapi.com';
    let s = $('#search').val();
    let params = {s: s, apikey: apikey};

    console.log(s);
    $.get(url, params, function(data, status) {
      alert('Data: ' + data + '\nStatus: ' + status);
    });
  });
});
