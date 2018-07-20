$(document).ready(function() {
  let url = '/courses';

  $.get(url, function(data, status) {
    drawTable(data);
  });
});

function drawTable(data) {
  for (var i = 0; i < data.length; i++) {
    drawRow(data[i]);
  }
}

function drawRow(rowData) {
  var row = $('<tr />');
  $('#courseDataTable').append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
  row.append($('<td><a href="/courseDetail/' + rowData.id + '">' + rowData.name + '</a></td>'));
  row.append($('<td>' + rowData.contact + '</td>'));
  row.append($('<td>' + rowData.phone + '</td>'));
  row.append($('<td>' + 
  rowData.street_address + '</td>'));
  row.append($('<td>' + rowData.city + '</td>'));
  row.append($('<td>' + rowData.state + '</td>'));
  row.append($('<td>' + rowData.zip + '</td>'));
  row.append($('<td><button type="button" class="btn btn-success" id="' + rowData.id + '">Edit</button></td>'));
}

function addCourse(){
  location.href = '/addCourse.html';
}