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
      newObject[element.to] = [];
      newObject[element.to].push({
        date:element.timestamp,
        token0: element.pair.token0.name,
        token1: element.pair.token1.name,
        amount0: element.amount0,
        amount1: element.amount1,
        amountUSD: element.amountUSD
      })
    }
    else {
      newObject[element.to].push({
        date:element.timestamp,
        token0: element.pair.token0.name,
        token1: element.pair.token1.name,
        amount0: element.amount0,
        amount1: element.amount1,
        amountUSD: element.amountUSD
      })
    }
  });
  return newObject;
}