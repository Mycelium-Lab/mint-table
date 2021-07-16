import logo from './logo.svg';
import './App.css';

import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  NetworkStatus
} from "@apollo/client";

import Paper from '@material-ui/core/Paper';
import MaterialTable from './MaterialTable';
import EnhancedTableToolbar from './EnchancedTableToolbar';
import React from 'react';
import { unixToNormal, setTimestamp } from './timeConvert';
import useStyles from './styles';

const headCells = [
  { id: 'to', disablePadding: false, label: 'Liquidity provider' },
];

const Mint = gql`
  query GetMint($timestamp: Int!, $amount: String!) {
    mints(first:1000, where: {amountUSD_gt: $amount, timestamp_gt: $timestamp}, orderBy: to, orderDirection: desc) {
      timestamp
      to
      amountUSD
      amount0
      amount1
      pair {
        token0 {
          name
        }
        token1 {
          name
        }
      }
    }
  }
`;

function noDup(data) {
  console.log(data.mints);
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

function App() {
  
  const classes = useStyles();
  const [timeStamp, setTimeStamp] = React.useState(setTimestamp(0));
  const [amount, setAmount] = React.useState("1000000");
  const { loading, error, data, refetch, networkStatus } = useQuery(Mint, {
    variables: { timestamp: timeStamp , amount: amount},
    notifyOnNetworkStatusChange: true,
    fetchPolicy:"cache-and-network"
  });
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {

    if (error) console.log(error);
    if (!loading) {
      console.log(noDup(data));
      setTableData(noDup(data));
    }
  
  },[data]);

  const handleToolbarChanged = (type, value) => {

    if (type == "period") {
      setTimeStamp(parseInt(setTimestamp(value)));
    }

    if (type == "amount") {

      if (!value) setAmount("1000000");
      else if (value == 1) setAmount("500000");
      else if (value == 2) setAmount("100000");

    }

  };

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar onChange={handleToolbarChanged} />
          {!loading && (
            <MaterialTable rows = {tableData} headCells = {headCells} classes={classes}>
            </MaterialTable>
            )
          }
        </Paper>
      </div>
    </div>
  );
}

export default App;
