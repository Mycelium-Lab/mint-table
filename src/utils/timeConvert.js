export { setTimestamp };

export default function unixToNormal(unix_timestamp) {
  var date = new Date(parseInt(unix_timestamp) * 1000);

  var day = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  if (month < 11) return day + '/0' + month + '/' + year;
  else return day + '/' + month + '/' + year;
}

function setTimestamp(value) {
  var today = new Date();
  if (!value) 
    return new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime() / 1000;
  else if (value === 1) 
    return new Date(today.getFullYear(), today.getMonth()-3, today.getDate()).getTime() / 1000;
  return new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime() / 1000;
}
