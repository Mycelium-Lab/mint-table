import logo from './logo.svg';
import './App.css';
import {ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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
    
    <TableContainer component={Paper} >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Liquidity provider</TableCell>
            <TableCell align="center">Amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.mints.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {row.id}
              </TableCell>
              <TableCell align="center"><a href={'https://etherscan.io/address/'+row.to}>{row.to}</a></TableCell>
              <TableCell align="center">{row.amountUSD}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}

export default App;
