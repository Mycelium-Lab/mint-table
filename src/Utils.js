export {getComparator, stableSort};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

 function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function noDup(data) {
  //console.log(data.mints);
  let last = '';
  let newObject = new Object();
  data.mints.map(element => {
    if (!(element.to in newObject)) {
      newObject[element.to] = {"totalAmount":parseFloat(element.amountUSD),data:[]};
    }
    newObject[element.to].data.push({
      date:element.timestamp,
      token0: element.pair.token0.symbol,
      token1: element.pair.token1.symbol,
      amountUSD: element.amountUSD,
      flag: 1
    })
    for (let burn of element.transaction.burns) {
      newObject[element.to].data.push({
      date:burn.timestamp,
      token0: burn.pair.token0.symbol,
      token1: burn.pair.token1.symbol,
      amountUSD: burn.amountUSD,
      flag: 0
    })
    }
  });
  return newObject;
}