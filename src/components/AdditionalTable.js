import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import unixToNormal from '../utils/timeConvert';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const RedTextTypography = withStyles({
  root: {
    color: "#FF0033"
  }
})(Typography);

const GreenTextTypography = withStyles({
  root: {
    color: "#00FF00"
  }
})(Typography);


export default function AdditionalTable(props) {
  const { rows } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="additional table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Pair</TableCell>
            <TableCell align="center">Total amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {unixToNormal(row.date)}
              </TableCell>
              <TableCell align="center">
                <a href={'https://v2.info.uniswap.org/pair/'+row.id}>
                  {row.token0 +' / '+ row.token1}
                </a>
              </TableCell>
              <TableCell align="center" color="#FF0033">
              { row.flag ? (
                <GreenTextTypography>
                  {'$ '+row.amountUSD.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </GreenTextTypography>
                ) : (
                <RedTextTypography>
                  {'$ '+row.amountUSD.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </RedTextTypography>
                )
              }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}