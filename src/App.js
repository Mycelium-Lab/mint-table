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
import setTimestamp from './timeConvert';
import noDup from './Utils';
import useStyles from './styles';

const Mint = gql`
  query GetMint($timestamp: Int!, $amount: String!) {
    mints(first:500, where: {amountUSD_gt: $amount, timestamp_gt: $timestamp}, orderBy: to, orderDirection: desc) {
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

function App() {
  
  const classes = useStyles();
  const [timeStamp, setTimeStamp] = React.useState(setTimestamp(0));
  const [amount, setAmount] = React.useState("1000000");
  const { loading, error, data, networkStatus } = useQuery(Mint, {
    variables: { timestamp: timeStamp , amount: amount},
    notifyOnNetworkStatusChange: true,
  });
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    console.log(loading);
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
  console.log(networkStatus);
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar onChange={handleToolbarChanged} />
          {!loading && (
            <MaterialTable rows = {tableData} classes={classes}>
            </MaterialTable>
            )
          }
        </Paper>
      </div>
    </div>
  );
}

export default App;
