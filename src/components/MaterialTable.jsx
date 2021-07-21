import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import EnhancedTableHead from './EnchancedTableHead';
import SmartRow from './SmartRow';

import {stableSort, getComparator} from '../utils/Utils';


export default function MaterialTable(props) {

  const { headCells, rows, classes } = props;

  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('totalAmount');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [expanded, setExpanded] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    //console.log(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRow = (value) => {

    setExpanded(value);
    
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.keys(rows).length - page * rowsPerPage);

  return (
        <div style={{backgroundColor: 'whiteSmoke'}}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
            headCells={headCells}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(Object.entries(rows), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage+rowsPerPage)
                .map(([row, value]) => {
                  const labelId = `enhanced-table-checkbox-${row}`;
                  return (
                    <SmartRow name={row} onChange={handleRow} data={value} expanded={expanded}/>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Object.keys(rows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
  );
}
