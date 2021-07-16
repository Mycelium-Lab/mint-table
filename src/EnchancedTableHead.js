import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort, headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
          {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
