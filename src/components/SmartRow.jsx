import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AdditionalTable from './AdditionalTable'; // компонент таблицы, которая появляется при открытии ячейки
import { threeCommas } from '../utils/Utils.js'; // функиця, которая преобразует float в число с запятыми после каждых 1000 $

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function SmartRow(props) {
  const {name, data, onChange, expanded} = props; // name - имя строки, data - объект данных, expanded - какая строка "открыта"
  const [open, setOpen] = React.useState(true); 
  const classes = useRowStyles();

  const handleChange = (name, open) => {
    setOpen(!open);
    onChange(open ? name : false); // onChange - функция для передачи данных в родительский компонент
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root} key={name} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => handleChange(name, open)}>
            {(expanded === name) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <a href={'https://etherscan.io/address/'+name}>
            {name}
          </a>
        </TableCell>
        <TableCell align="center">
          {'$ '+ threeCommas(data.totalAmount)}
        </TableCell>
        <TableCell align="center">
          {data.data.length}
        </TableCell>
        <TableCell align="center">
          {data.active}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expanded === name} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <AdditionalTable rows={data.data} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}