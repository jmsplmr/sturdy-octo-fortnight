$(document).ready(function() {
  let id = $('#id_val').val();
  let url = '/course/' + id;

  $.get(url, function(data, status) {
    drawTable(data);
  });
});

function drawTable(data) {

  for (var i = 0; i < data.length; i++) {
    $('title').text(function(i, old) {
      return data[i].name;
    });
    drawRow(data[i]);
  }
}

function drawRow(rowData) {
  var row = $('<tr />');
  $('#courseDataTable').append(row); //this will append tr element to table... keep its reference for a while since we will add cells into it
  row.append($('<td>' + rowData.contact + '</td>'));
  row.append($('<td>' + rowData.phone + '</td>'));
  row.append($('<td>' + rowData.street_address + '</td>'));
  row.append($('<td>' + rowData.city + '</td>'));
  row.append($('<td>' + rowData.state + '</td>'));
  row.append($('<td>' + rowData.zip + '</td>'));
  row.append($('</tr>'));
}
