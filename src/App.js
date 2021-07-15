import logo from './logo.svg';
import './App.css';
import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import MaterialTable from './MaterialTable';
import React from 'react';

const Mint = gql`
  query GetMint {
    mints(where: {amountUSD_gt: "1000000", timestamp_gt: "1608335878"}, orderBy: to, orderDirection: desc) {
      timestamp
      to
      amountUSD
    }
  }
`;

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'to', numeric: true, disablePadding: false, label: 'Liquidity provider' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount (USD)' },
];


function App() {
  const { loading, error, data } = useQuery(Mint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let last = '';
  let noDup = new Array();
  data.mints.map(element => {
    if (last != element.to) {
      last = element.to;
      noDup.push(element);
    } 
  });
  console.log(noDup);


  return (
    <div>
    
    <MaterialTable rows = {noDup} headCells = {headCells}>
    </MaterialTable>

    </div>
  );
}

export default App;
