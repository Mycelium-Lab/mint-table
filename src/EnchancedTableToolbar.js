import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PropTypes from 'prop-types';
import React from 'react';


const useToolbarStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
    align: 'center'
  },
}));

export default function EnhancedTableToolbar ({onChange}){
  const classes = useToolbarStyles();
  const [anchorEl, setAnchorEl ] = React.useState(null);
  const [menuName, setMenuName] = React.useState('1 month');

  let menuNames = ['1 month','3 months','1 year']

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeItem = (value) => {
    setMenuName(menuNames[value]);
    onChange('period',value);
  }

  return (
    <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          The best liquidity providers
        </Typography>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {menuName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem value="0" onClick={e => changeItem(e.target.value)}>1 month</MenuItem>
          <MenuItem value="1" onClick={e => changeItem(e.target.value)}>3 months</MenuItem>
          <MenuItem value="2" onClick={e => changeItem(e.target.value)}>Year</MenuItem>
        </Menu>
    </Toolbar>
  );
};
