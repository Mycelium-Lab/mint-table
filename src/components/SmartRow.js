import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AdditionalTable from './AdditionalTable';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function SmartRow(props) {
  const {name, data, onChange, expanded} = props;
  const [open, setOpen] = React.useState(true);
  const classes = useRowStyles();

  const handleChange = (name, open) => {
    console.log(name, !open);
    setOpen(!open);
    onChange(open ? name : false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
          {'$ '+data.totalAmount.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </TableCell>
        <TableCell align="center">
          {data.data.length}
        </TableCell>
        <TableCell align="center">
          {data.data.length}
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