import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import unixToNormal from './timeConvert';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});


export default function AdditionalTable(props) {
  const { rows } = props;
  console.log(rows);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="additional table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">First token</TableCell>
            <TableCell align="center">Amount (tokens)</TableCell>
            <TableCell align="center">Second token</TableCell>
            <TableCell align="center">Amount (tokens)</TableCell>
            <TableCell align="center">Total amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {unixToNormal(row.date)}
              </TableCell>
              <TableCell align="center">{row.token0}</TableCell>
              <TableCell align="center">{row.amount0.toString().split('.')[0]}</TableCell>
              <TableCell align="center">{row.token1}</TableCell>
              <TableCell align="center">{row.amount1.toString().split('.')[0]}</TableCell>
              <TableCell align="center">{row.amountUSD.toString().split('.')[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}