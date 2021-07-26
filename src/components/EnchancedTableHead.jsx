import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { withStyles } from '@material-ui/core/styles';


const StyledTableRow = withStyles((theme) => ({ // попытка в цвета и стили
  root: {
      '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  // classes - стили
  // order, orderBy сортировать по какому полю
  // onRequestSort - функция-хэндлер для родительского компонента


  // хэндлер для сортировки при нажатии на "стрелочку"
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
}
