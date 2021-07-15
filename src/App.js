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


const Mint = gql`
  query GetMint($timestamp: Int!) {
    mints(where: {amountUSD_gt: "1000000", timestamp_gt: $timestamp}, orderBy: to, orderDirection: desc) {
      timestamp
      to
      amountUSD
    }
  }
`;

const headCells = [
  { id: 'time', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'to', numeric: true, disablePadding: false, label: 'Liquidity provider' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount (USD)' },
];

function noDup(data) {

  let last = '';
  let newArray = new Array();
  data.mints.map(element => {
    if (last != element.to) {
      last = element.to;
      newArray.push(element);
    } 
  });
  return newArray;
}

function App() {
  
  const classes = useStyles();
  const [timeStamp, setTimeStamp] = React.useState(setTimestamp(0));
  const { loading, error, data, refetch, networkStatus } = useQuery(Mint, {
    variables: { timestamp: timeStamp  },
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
    /*
    console.log(timestamp);
    await refetch({ variables: { timestamp } });
    console.log(noDup(data));
    setTableData(noDup(data));*/

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
