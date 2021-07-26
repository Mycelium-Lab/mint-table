export { setTimestamp };

export default function unixToNormal(unix_timestamp) {  // переводит время из формата unix timetamp в наше родное, человеческое время. Мы же не роботы
  var date = new Date(parseInt(unix_timestamp) * 1000);

  var day = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  if (month < 11) return day + '/0' + month + '/' + year;
  else return day + '/' + month + '/' + year;
}

function setTimestamp(value) { // в зависимости от значения в тулбаре вычисляет timestamp 
  var today = new Date(); // сегодня
  if (!value) 
    return new Date(today.getFullYear(), today.getMonth()-1, today.getDate()).getTime() / 1000; // месяц назад 
  else if (value === 1) 
    return new Date(today.getFullYear(), today.getMonth()-3, today.getDate()).getTime() / 1000; // 3 месяца назад
  return new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime() / 1000; // год назад
}
