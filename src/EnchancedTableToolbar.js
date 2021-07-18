import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
    align: 'center'
  },
}));

export default function EnhancedTableToolbar ({onChange}){
  const classes = useToolbarStyles();
  const [date, setDate ] = React.useState(null);
  const [amo, setAmo ] = React.useState(null);
  const [dateName, setDateName] = React.useState('1 month');
  const [amoName, setAmoName] = React.useState('1 M');

  let menuNames = ['1 month','3 months','1 year'];
  let amoNames = ['1 M','500 K','100 K'];

  const handleClickDate = (event) => { // хендлы кликов по элементам меню
    setDate(event.currentTarget);
  };

  const handleClickAmo = (event) => {
    setAmo(event.currentTarget);
  };

  const handleCloseDate = () => { // хендлы закрытия меню
    setDate(null);
  };

  const handleCloseAmo = () => {
    setAmo(null);
  };

  const changeItemDate = (value) => { // хендлы выбора элементов меню
    setDateName(menuNames[value]);
    onChange('period',value);
  }

  const changeItemAmo = (value) => {
    setAmoName(amoNames[value]);
    onChange('amount',value);
  }

  return (
    <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          The best liquidity providers
        </Typography>
        <Button aria-controls="date-menu" aria-haspopup="true" onClick={handleClickDate}>
          {dateName}
        </Button>
        <Menu
          id="date-menu"
          anchorEl={date}
          keepMounted
          open={Boolean(date)}
          onClose={handleCloseDate}
        >
          <MenuItem value="0" onClick={e => changeItemDate(e.target.value)}>1 month</MenuItem>
          <MenuItem value="1" onClick={e => changeItemDate(e.target.value)}>3 months</MenuItem>
          <MenuItem value="2" onClick={e => changeItemDate(e.target.value)}>Year</MenuItem>
        </Menu>
        <Button aria-controls="amo-menu" aria-haspopup="true" onClick={handleClickAmo}>
          {amoName}
        </Button>
        <Menu
          id="amo-menu"
          anchorEl={amo}
          keepMounted
          open={Boolean(amo)}
          onClose={handleCloseAmo}
        >
          <MenuItem value="0" onClick={e => changeItemAmo(e.target.value)}>1 M</MenuItem>
          <MenuItem value="1" onClick={e => changeItemAmo(e.target.value)}>500 k</MenuItem>
          <MenuItem value="2" onClick={e => changeItemAmo(e.target.value)}>100 k</MenuItem>
        </Menu>
    </Toolbar>
  );
};
