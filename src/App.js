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


function App() {
  const { loading, error, data } = useQuery(Mint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
    
    <MaterialTable rows = {data.mints}>
    </MaterialTable>

    </div>
  );
}

export default App;
