import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import EnhancedTableHead from './EnchancedTableHead';
import SmartAccordion from './SmartAccordion';

import unixToNormal from './timeConvert';
import {stableSort, getComparator} from './Utils';


export default function MaterialTable(props) {

  const { rows, headCells, classes } = props;

  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expanded, setExpanded] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAccordion = (value) => {
    console.log(value);
    setExpanded(value);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.keys(rows).length - page * rowsPerPage);

  return (
        <div>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {Object.entries(rows)
                .slice(page * rowsPerPage, page * rowsPerPage+rowsPerPage)
                .map(([row, value]) => {
                  const labelId = `enhanced-table-checkbox-${row}`;
                  return (
                    <SmartAccordion name={row} onChange={handleAccordion} data={value} expanded={expanded}/>
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
