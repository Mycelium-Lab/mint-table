export {getComparator, stableSort, threeCommas};

function descendingComparator(a, b, orderBy) { // компаратор убывания
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

 function getComparator(order, orderBy) {  // функция, которая переключает компаратор в зависимости от asc или desc
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) { // функция сортинга

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0][1], b[0][1]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function noDup(data) { // форматирует запрос их массива событий mint в объект с id кошелька в качетсве ключа
  //console.log(data.mints);          // Если хочешь сохранить свою психику даже не пытайся разобраться
  let newObject = {};
  data.mints.map(element => {
    if (!(element.to in newObject)) {
      newObject[element.to] = {totalAmount:parseFloat(0),data:[], active:0, length:0};
    }
    newObject[element.to].totalAmount = newObject[element.to].totalAmount + parseFloat(element.amountUSD); 
    newObject[element.to].active +=1;
    newObject[element.to].length +=1;

    newObject[element.to].data.push({ // я предупреждал
      date:element.timestamp,
      token0: element.pair.token0.symbol,
      token1: element.pair.token1.symbol,
      amountUSD: element.amountUSD,
      flag: 1
    })

    for (let burn of element.transaction.burns) {
      //console.log(element.to);
      newObject[element.to].length +=1;
      if ((parseFloat(element.amountUSD) - parseFloat(burn.amountUSD)) < parseFloat(1000)) {
        newObject[element.to].active -= 1;
        //console.log(parseFloat(element.amountUSD) - parseFloat(burn.amountUSD));
      }
      
      newObject[element.to].data.push({
      date: burn.timestamp,
      token0: burn.pair.token0.symbol,
      token1: burn.pair.token1.symbol,
      amountUSD: burn.amountUSD,
      flag: 0
    })
    }
  });
  return newObject;
}

function threeCommas(str) { // функиця, которая преобразует float в число с запятыми после каждых 1000 $
  return str.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}