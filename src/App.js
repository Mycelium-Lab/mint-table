import logo from './logo.svg';
import './App.css';
import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import MaterialTable from './MaterialTable';

const Mint = gql`
  query GetMint {
    mints(where: {amountUSD_gt: "1000000", timestamp_gt: "1618335878"}, orderBy: timestamp, orderDirection: desc) {
      id
      to
      amountUSD
    }
  }
`;

const LiqProv = gql`
  query GetMint {
    mints(where: {amountUSD_gt: "1000000", timestamp_gt: "1618335878"}, orderBy: to, orderDirection: desc) {
      to
      amountUSD
    }
  }
`;

const headCells_mint = [
  { id: 'name', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'LiqProv', numeric: true, disablePadding: false, label: 'Liquidity provider' },
  { id: 'amountUSD', numeric: true, disablePadding: false, label: 'Amount (USD)' },
];

const headCells_prov = [
  { id: 'LiqProv', numeric: true, disablePadding: false, label: 'Liquidity provider' },
  { id: 'amountUSD', numeric: true, disablePadding: false, label: 'Amount (USD)' },
];


function App() {
  const { loading_mint, error_mint, data_mint } = useQuery(Mint);


  if (loading_mint) return <p>Loading...</p>;
  if (error_mint) return <p>Error :(</p>;

  return (
    <div>
    
    <MaterialTable rows = {data_mint.mints} headCells = {headCells_mint}>
    </MaterialTable>

    <MaterialTable rows = {data_prov.mints} headCells = {headCells_prov}>
    </MaterialTable>
    </div>
  );
}

export default App;
